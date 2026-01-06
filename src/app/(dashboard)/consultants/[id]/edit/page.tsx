import { getConsultant, updateConsultant, deleteConsultant } from '@/lib/actions/consultants';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function EditConsultantPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const consultant = await getConsultant(id);

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateConsultant(id, formData);
  }

  async function handleDelete() {
    'use server';
    await deleteConsultant(id);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Edit Consultant</h1>

      <Card>
        <form action={handleUpdate}>
          <Input label="Consultant Name *" name="name" defaultValue={consultant.name} required />
          <Input 
            label="Default Rate *" 
            name="defaultRate" 
            type="number" 
            step="0.01" 
            defaultValue={consultant.default_rate}
            required 
          />
          <Input 
            label="Unit Type" 
            name="unitType" 
            defaultValue={consultant.unit_type}
          />
          <Input 
            label="Default Description" 
            name="defaultDescription" 
            defaultValue={consultant.default_description || ''}
          />

          <div className="flex gap-4 mt-6">
            <Button type="submit">Update Consultant</Button>
            <Link href="/consultants">
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
