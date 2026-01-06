import { getClients } from '@/lib/actions/clients';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Link href="/clients/new">
          <Button>Add Client</Button>
        </Link>
      </div>

      <Card>
        {clients.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No clients yet. Add your first client to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Address</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Terms</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client: any) => (
                  <tr key={client.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{client.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {client.address_line1 || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm">{client.email || '-'}</td>
                    <td className="py-3 px-4 text-sm">{client.terms || '-'}</td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/clients/${client.id}/edit`}>
                        <Button variant="secondary" className="text-sm">
                          Edit
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
