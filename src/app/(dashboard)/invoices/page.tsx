import { getInvoices } from '@/lib/actions/invoices';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Link href="/invoices/new">
          <Button>Create Invoice</Button>
        </Link>
      </div>

      <Card>
        {invoices.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No invoices yet. Create your first invoice or set up a recurring template.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Invoice #</th>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Issue Date</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice: any) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{invoice.invoice_number}</td>
                    <td className="py-3 px-4">{invoice.clients?.name}</td>
                    <td className="py-3 px-4 text-sm">{formatDate(invoice.issue_date)}</td>
                    <td className="py-3 px-4 font-semibold">{formatCurrency(invoice.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        invoice.status === 'ready' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/invoices/${invoice.id}`}>
                        <Button variant="secondary" className="text-sm">View</Button>
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
