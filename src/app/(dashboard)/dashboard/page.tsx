import { Card } from '@/components/ui/card';
import { getInvoices } from '@/lib/actions/invoices';
import { getClients } from '@/lib/actions/clients';
import { getTemplates } from '@/lib/actions/templates';

export default async function DashboardPage() {
  const [invoices, clients, templates] = await Promise.all([
    getInvoices().catch(() => []),
    getClients().catch(() => []),
    getTemplates().catch(() => []),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">Total Invoices</h3>
          <p className="text-4xl font-bold mt-2">{invoices.length}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">Active Clients</h3>
          <p className="text-4xl font-bold mt-2">{clients.length}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-600">Templates</h3>
          <p className="text-4xl font-bold mt-2">{templates.length}</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Recent Invoices</h2>
        {invoices.length === 0 ? (
          <p className="text-gray-500">No invoices yet</p>
        ) : (
          <div className="space-y-2">
            {invoices.slice(0, 5).map((invoice: any) => (
              <div key={invoice.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{invoice.invoice_number}</p>
                  <p className="text-sm text-gray-600">{invoice.clients?.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${invoice.total}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    invoice.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
