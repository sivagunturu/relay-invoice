import { login } from '@/lib/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login to RelayInvoice</h1>
        <form action={login}>
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
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
