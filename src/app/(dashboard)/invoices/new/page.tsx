import { createInvoice } from '@/lib/actions/invoices';
import { getClients } from '@/lib/actions/clients';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function NewInvoicePage() {
  const clients = await getClients();

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Create New Invoice</h1>

      <Card>
        <form action={createInvoice}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client *
            </label>
            <select 
              name="clientId" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a client</option>
              {clients.map((client: any) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          
          <Input 
            label="Issue Date *" 
            name="issueDate" 
            type="date" 
            required 
            defaultValue={new Date().toISOString().split('T')[0]}
          />
          
          <Input 
            label="Month (YYYY-MM) *" 
            name="month" 
            required 
            placeholder="2026-01"
            defaultValue={new Date().toISOString().slice(0, 7)}
          />
          
          <Input 
            label="Terms *" 
            name="terms" 
            required 
            defaultValue="Net 60"
          />
          
          <Input 
            label="Currency *" 
            name="currency" 
            required 
            defaultValue="USD"
          />

          <div className="flex gap-4 mt-6">
            <Button type="submit">Create Invoice</Button>
            <Link href="/invoices">
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
