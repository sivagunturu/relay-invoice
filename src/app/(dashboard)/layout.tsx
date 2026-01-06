import { Sidebar } from '@/components/layout/sidebar';
import { getUser } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
