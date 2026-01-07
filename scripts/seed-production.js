const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wsjedcqjyjrtvmucteaj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzamVkY3FqeWpydHZtdWN0ZWFqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjA2NjkzOCwiZXhwIjoyMDUxNjQyOTM4fQ.mCy7Y_P0f0yPP2_y3C1Wso-Zx0Y7X7uyJVNfNK5MbRs'
);

async function seedProduction() {
  console.log('🌱 Seeding production database...');

  // You need to use your production login credentials
  const email = 'aviskris1213@gmail.com'; // Your production email
  const password = 'Oaa@48236'; // Your production password

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    console.error('❌ Please update email/password in the script with your production credentials');
    return;
  }

  const user = authData.user;
  console.log(`✅ Authenticated as: ${user.email}`);

  // Create organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert({
      name: 'Hantec Global Inc',
    })
    .select()
    .single();

  if (orgError) {
    console.error('❌ Error creating organization:', orgError);
    return;
  }

  console.log(`✅ Created organization: ${org.name}`);

  // Create org membership
  await supabase.from('org_memberships').insert({
    org_id: org.id,
    user_id: user.id,
    role: 'owner',
    status: 'active'
  });

  console.log('✅ Created organization membership');

  // Create clients
  const clientsData = [
    { org_id: org.id, name: 'Sage IT INC', address_line1: '456 Tech Avenue', address_line2: 'Austin, TX 78701' },
    { org_id: org.id, name: 'Infosys Technologies', address_line1: '789 Innovation Drive', address_line2: 'Houston, TX 77002' }
  ];

  for (const client of clientsData) {
    await supabase.from('clients').insert(client);
  }

  console.log(`✅ Created ${clientsData.length} clients`);

  // Create consultants
  const consultantsData = [
    { org_id: org.id, name: 'Mounika Vadlamudi', email: 'mounika@hantecglobal.com' },
    { org_id: org.id, name: 'Siva Gunturu', email: 'siva@hantecglobal.com' }
  ];

  for (const consultant of consultantsData) {
    await supabase.from('consultants').insert(consultant);
  }

  console.log(`✅ Created ${consultantsData.length} consultants`);
  console.log('\n🎉 Production database seeded successfully!');
}

seedProduction().catch(console.error);
