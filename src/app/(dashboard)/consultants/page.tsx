import { getConsultants } from '@/lib/actions/consultants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default async function ConsultantsPage() {
  const consultants = await getConsultants();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Consultants</h1>
        <Link href="/consultants/new">
          <Button>Add Consultant</Button>
        </Link>
      </div>

      <Card>
        {consultants.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No consultants yet. Add your first consultant to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Default Rate</th>
                  <th className="text-left py-3 px-4">Unit Type</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultants.map((consultant: any) => (
                  <tr key={consultant.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{consultant.name}</td>
                    <td className="py-3 px-4">{formatCurrency(consultant.default_rate)}</td>
                    <td className="py-3 px-4">{consultant.unit_type}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {consultant.default_description || '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/consultants/${consultant.id}/edit`}>
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
