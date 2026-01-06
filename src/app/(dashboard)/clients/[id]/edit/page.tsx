import { getClient, updateClient, deleteClient } from '@/lib/actions/clients';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
      <h1 className="text-3xl font-bold mb-8">Edit Client</h1>

      <Card>
        <form action={handleUpdate}>
          <Input label="Client Name *" name="name" defaultValue={client.name} required />
          <Input label="Address Line 1" name="addressLine1" defaultValue={client.address_line1 || ''} />
          <Input label="Address Line 2" name="addressLine2" defaultValue={client.address_line2 || ''} />
          <Input label="Address Line 3" name="addressLine3" defaultValue={client.address_line3 || ''} />
          <Input label="Email" name="email" type="email" defaultValue={client.email || ''} />
          <Input label="Payment Terms" name="terms" defaultValue={client.terms || ''} />
          <Input label="Currency" name="currency" defaultValue={client.currency || ''} />

          <div className="flex gap-4 mt-6">
            <Button type="submit">Update Client</Button>
            <Link href="/clients">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
            <form action={handleDelete} className="ml-auto">
              <Button type="submit" variant="danger">
                Delete
              </Button>
            </form>
          </div>
        </form>
      </Card>
    </div>
  );
}
