import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { GeneratePDFButton } from '@/components/invoices/generate-pdf-button';

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select(`
      *,
      clients (*),
      invoice_items (*)
    `)
    .eq('id', id)
    .single();

  if (error || !invoice) {
    notFound();
  }

  // Get PDF URL if status is ready
  let pdfUrl = null;
  if (invoice.status === 'ready') {
    const { data } = supabase.storage
      .from('invoices')
      .getPublicUrl(`${invoice.org_id}/${invoice.invoice_number}.pdf`);
    pdfUrl = data.publicUrl;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/invoices"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              download={`${invoice.invoice_number}.pdf`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          )}
          <GeneratePDFButton invoiceId={invoice.id} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {invoice.invoice_number}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Status: <span className="capitalize">{invoice.status}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">
              ${invoice.total.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
            <p className="font-medium">{invoice.clients.name}</p>
            {invoice.clients.address_line1 && (
              <p className="text-sm text-gray-600">{invoice.clients.address_line1}</p>
            )}
            {invoice.clients.address_line2 && (
              <p className="text-sm text-gray-600">{invoice.clients.address_line2}</p>
            )}
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Issue Date:</span>
                <span className="text-sm font-medium">
                  {new Date(invoice.issue_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Due Date:</span>
                <span className="text-sm font-medium">
                  {new Date(invoice.due_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Terms:</span>
                <span className="text-sm font-medium">{invoice.terms}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Line Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.invoice_items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      {item.qty}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      ${item.rate.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">
                      ${item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
