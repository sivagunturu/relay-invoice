import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Edit, FileText } from 'lucide-react';
import { GeneratePDFButton } from '@/components/invoices/generate-pdf-button';
import { ViewPDFButton } from '@/components/invoices/view-pdf-button';
import { Button } from '@/components/ui/button';
import { getInvoice } from '@/lib/actions/invoices';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-500',
};

const invoiceTypeLabels: Record<string, string> = {
  C2C: 'Corp-to-Corp',
  W2: 'W-2 Employee',
  '1099': '1099 Contractor',
};

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = await getInvoice(id);

  if (!invoice) {
    notFound();
  }

  const hasPdf = invoice.status === 'ready' || invoice.status === 'sent' || invoice.status === 'paid';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
          <Link href={`/invoices/${invoice.id}/edit`}>
            <Button variant="secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit Items
            </Button>
          </Link>
          {hasPdf && (
            <ViewPDFButton invoiceNumber={invoice.invoice_number} orgId={invoice.org_id} />
          )}
          <GeneratePDFButton invoiceId={invoice.id} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {invoice.invoice_number}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status] || statusColors.draft}`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
              {invoice.invoice_type && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {invoiceTypeLabels[invoice.invoice_type] || invoice.invoice_type}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(invoice.total)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bill To</h3>
            <p className="font-semibold text-gray-900">{invoice.clients?.name}</p>
            {invoice.clients?.address_line1 && (
              <p className="text-sm text-gray-600">{invoice.clients.address_line1}</p>
            )}
            {invoice.clients?.address_line2 && (
              <p className="text-sm text-gray-600">{invoice.clients.address_line2}</p>
            )}
            {(invoice.clients?.city || invoice.clients?.state || invoice.clients?.zip_code) && (
              <p className="text-sm text-gray-600">
                {[invoice.clients?.city, invoice.clients?.state, invoice.clients?.zip_code].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Issue Date:</span>
                <span className="text-sm font-medium">{formatDate(invoice.issue_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Due Date:</span>
                <span className="text-sm font-medium">{formatDate(invoice.due_date)}</span>
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
            <table className="min-w-full">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider rounded-tl-lg">
                    Description
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider rounded-tr-lg">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.invoice_items && invoice.invoice_items.length > 0 ? (
                  invoice.invoice_items.map((item: any) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-center">
                        {item.qty}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-center">
                        {formatCurrency(item.rate)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No line items yet.</p>
                      <Link href={`/invoices/${invoice.id}/edit`} className="text-blue-600 hover:underline">
                        Add items to this invoice
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Tax{invoice.tax_rate > 0 ? ` (${invoice.tax_rate}%)` : ''}:
                </span>
                <span className="font-medium">{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t-2 border-blue-600 pt-3 mt-3">
                <span className="text-gray-900">Total:</span>
                <span className="text-blue-600">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {invoice.compliance_text && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="text-sm font-semibold text-amber-800 mb-1">Compliance Notice</h4>
            <p className="text-sm text-amber-700">{invoice.compliance_text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
