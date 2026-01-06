import { signUp } from '@/lib/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign up for RelayInvoice</h1>
        <form action={signUp}>
          <Input
            label="Company Name"
            type="text"
            name="companyName"
            required
          />
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
            minLength={8}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
