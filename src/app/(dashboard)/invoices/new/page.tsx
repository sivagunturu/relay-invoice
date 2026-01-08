import { createInvoice } from '@/lib/actions/invoices';
import { getClients } from '@/lib/actions/clients';
import { getConsultants } from '@/lib/actions/consultants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { INVOICE_TYPES, PAYMENT_TERMS } from '@/lib/config/us-states';

export default async function NewInvoicePage() {
  const clients = await getClients();
  const consultants = await getConsultants();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create New Invoice</h1>
        <Link href="/invoices">
          <Button variant="secondary">Back to Invoices</Button>
        </Link>
      </div>

      <Card>
        <form action={createInvoice} className="space-y-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Invoice Type</h2>
            <div className="space-y-3">
              {INVOICE_TYPES.map((type) => (
                <label key={type.value} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="invoice_type"
                    value={type.value}
                    defaultChecked={type.value === 'C2C'}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Client & Consultant</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client (Bill To) *
                </label>
                <select
                  name="client_id"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a client</option>
                  {clients.map((client: any) => (
                    <option key={client.id} value={client.id}>
                      {client.name} {client.state ? `(${client.state})` : ''}
                    </option>
                  ))}
                </select>
                {clients.length === 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    No clients found. <Link href="/clients/new" className="text-blue-600 hover:underline">Add a client first</Link>.
                  </p>
                )}
              </div>

              {consultants.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultant (Optional)
                  </label>
                  <select
                    name="consultant_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No consultant selected</option>
                    {consultants.map((consultant: any) => (
                      <option key={consultant.id} value={consultant.id}>
                        {consultant.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <Input
                label="Issue Date *"
                name="issue_date"
                type="date"
                required
                defaultValue={new Date().toISOString().split('T')[0]}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Terms *
                </label>
                <select
                  name="terms"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PAYMENT_TERMS.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={clients.length === 0}>
              Create Invoice
            </Button>
            <Link href="/invoices">
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
