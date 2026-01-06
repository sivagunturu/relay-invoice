'use client';

import { useState, useEffect } from 'react';
import { updateInvoiceItems } from '@/lib/actions/invoices';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('');
  const [items, setItems] = useState([{ description: '', qty: '', rate: '' }]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  const addItem = () => {
    setItems([...items, { description: '', qty: '', rate: '' }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateInvoiceItems(id, items);
      window.location.href = `/invoices/${id}`;
    } catch (error) {
      alert('Error saving invoice items');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Invoice</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <Input
                  label="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Quantity"
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItem(index, 'qty', e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Rate"
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', e.target.value)}
                />
              </div>
            </div>
          ))}

          <Button type="button" onClick={addItem}>
            Add Item
          </Button>

          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Invoice'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
