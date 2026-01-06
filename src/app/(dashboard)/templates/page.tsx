import { getTemplates } from '@/lib/actions/templates';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invoice Templates</h1>
        <Link href="/templates/new">
          <Button>Create Template</Button>
        </Link>
      </div>

      <Card>
        {templates.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No templates yet. Create a recurring invoice template to automate billing.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Day of Month</th>
                  <th className="text-left py-3 px-4">Next Run</th>
                  <th className="text-left py-3 px-4">Auto Send</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template: any) => (
                  <tr key={template.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{template.name}</td>
                    <td className="py-3 px-4">{template.clients?.name}</td>
                    <td className="py-3 px-4">{template.day_of_month}</td>
                    <td className="py-3 px-4 text-sm">
                      {formatDate(template.next_run_at)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        template.auto_send 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {template.auto_send ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/templates/${template.id}/edit`}>
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
