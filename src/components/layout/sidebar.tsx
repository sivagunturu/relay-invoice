'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Clients', href: '/clients' },
  { name: 'Consultants', href: '/consultants' },
  { name: 'Templates', href: '/templates' },
  { name: 'Invoices', href: '/invoices' },
  { name: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">RelayInvoice</h1>
      </div>
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8">
        <form action={logout}>
          <button
            type="submit"
            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800 rounded-md"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
