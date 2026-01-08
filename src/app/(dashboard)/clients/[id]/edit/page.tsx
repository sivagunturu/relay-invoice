import { getClient, updateClient, deleteClient } from '@/lib/actions/clients';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { US_STATES, PAYMENT_TERMS } from '@/lib/config/us-states';

export default async function EditClientPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const client = await getClient(id);

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateClient(id, formData);
  }

  async function handleDelete() {
    'use server';
    await deleteClient(id);
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Client</h1>
        <Link href="/clients">
          <Button variant="secondary">Back to Clients</Button>
        </Link>
      </div>

      <Card>
        <form action={handleUpdate} className="space-y-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <Input
                label="Company Name *"
                name="name"
                defaultValue={client.name}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={client.email || ''}
                />
                <Input
                  label="Phone"
                  name="phone"
                  defaultValue={client.phone || ''}
                />
              </div>
              <Input
                label="Tax ID / EIN"
                name="tax_id"
                defaultValue={client.tax_id || ''}
              />
            </div>
          </div>

          <div className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Address</h2>
            <div className="space-y-4">
              <Input
                label="Address Line 1 *"
                name="address_line1"
                defaultValue={client.address_line1 || ''}
                required
              />
              <Input
                label="Address Line 2"
                name="address_line2"
                defaultValue={client.address_line2 || ''}
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  defaultValue={client.city || ''}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    defaultValue={client.state || ''}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="ZIP Code"
                  name="zip_code"
                  defaultValue={client.zip_code || ''}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Terms</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Payment Terms
              </label>
              <select
                name="terms"
                defaultValue={client.terms || 'Net 30'}
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

          <div className="flex gap-4 pt-4">
            <Button type="submit">Update Client</Button>
            <Link href="/clients">
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
            <form action={handleDelete} className="ml-auto">
              <Button type="submit" variant="danger">Delete</Button>
            </form>
          </div>
        </form>
      </Card>
    </div>
  );
}
