import { addClient } from '@/lib/actions/clients';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Client</h1>

      <Card className="p-6">
        <form action={addClient} className="space-y-4">
          <Input
            label="Name"
            name="name"
            required
          />
          <Input
            label="Address Line 1"
            name="address_line1"
            required
          />
          <Input
            label="Address Line 2"
            name="address_line2"
          />
          <Button type="submit">
            Create Client
          </Button>
        </form>
      </Card>
    </div>
  );
}
