'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Create organization
    const { data: org } = await supabase
      .from('organizations')
      .insert({ name: companyName })
      .select()
      .single();

    // Create membership
    await supabase.from('org_memberships').insert({
      org_id: org.id,
      user_id: user.id,
      role: 'owner',
      status: 'active'
    });

    // Create default settings
    await supabase.from('org_settings').insert({
      org_id: org.id,
      company_name: companyName,
    });

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to RelayInvoice!</h1>
        <p className="text-gray-600 mb-6">Let's set up your organization</p>

        <form onSubmit={handleSetup} className="space-y-4">
          <Input
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Acme Inc"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Setting up...' : 'Complete Setup'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
