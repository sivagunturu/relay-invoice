const { createClient } = require('@supabase/supabase-js');
const { generatePDF } = require('./jobs/generate-pdf');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('  SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const JOB_HANDLERS = {
  'generate_pdf': generatePDF,
};

async function pollAndProcessJobs() {
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'queued')
    .order('created_at', { ascending: true })
    .limit(5);

  if (error) {
    console.error('Error fetching jobs:', error);
    return;
  }

  if (!jobs || jobs.length === 0) {
    return;
  }

  console.log(`📦 Found ${jobs.length} job(s)`);

  for (const job of jobs) {
    await processJob(job);
  }
}

async function processJob(job) {
  console.log(`\n▶️  Processing job ${job.id} (${job.type || job.job_type})`);

  const { error: runningError } = await supabase
    .from('jobs')
    .update({ 
      status: 'running',
      updated_at: new Date().toISOString()
    })
    .eq('id', job.id);

  if (runningError) {
    console.error('Failed to mark job as running:', runningError);
    return;
  }

  try {
    const handler = JOB_HANDLERS[job.type || job.job_type];
    if (!handler) {
      throw new Error(`No handler for job type: ${job.type || job.job_type}`);
    }

    const result = await handler(supabase, job);

    const { error: doneError } = await supabase
      .from('jobs')
      .update({
        status: 'done',
        updated_at: new Date().toISOString()
      })
      .eq('id', job.id);

    if (doneError) {
      console.error('❌ Failed to mark job as done:', doneError);
    } else {
      console.log(`✅ Job ${job.id} completed`);
    }
  } catch (error) {
    console.error(`❌ Job ${job.id} failed:`, error.message);

    await supabase
      .from('jobs')
      .update({
        status: 'failed',
        last_error: error.message,
        attempts: (job.attempts || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', job.id);
  }
}

async function main() {
  console.log('🚀 PDF Worker started');
  console.log('📡 Connected to Supabase');
  console.log('🔍 Polling for jobs every 5 seconds...\n');

  while (true) {
    try {
      await pollAndProcessJobs();
    } catch (error) {
      console.error('Error in main loop:', error);
    }
    
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

main().catch(console.error);
