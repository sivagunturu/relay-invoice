import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

async function login(formData: FormData): Promise<void> {
  'use server';
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!error) {
    redirect('/dashboard');
  }
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">Login to RelayInvoice</h1>
        <form action={login} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
