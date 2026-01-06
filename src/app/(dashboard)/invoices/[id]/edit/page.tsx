'use client';

import { useState, useEffect } from 'react';
import { updateInvoiceItems } from '@/lib/actions/invoices';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';

export default function EditInvoicePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const [items, setItems] = useState([{ description: 'IT Consulting Services – Mounika Vadlamudi', qty: 88, rate: 65 }]);
  const [saving, setSaving] = useState(false);

  function addItem() {
    setItems([...items, { description: '', qty: 0, rate: 0 }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateInvoiceItems(id, JSON.stringify(items));
      window.location.href = `/invoices/${id}`;
    } catch (error) {
      alert('Error saving invoice items');
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Invoice Items</h1>

      <Card>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded">
              <Input 
                label="Description *" 
                value={item.description}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].description = e.target.value;
                  setItems(newItems);
                }}
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <Input 
                  label="Quantity *" 
                  type="number"
                  step="0.01"
                  value={item.qty}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].qty = parseFloat(e.target.value) || 0;
                    setItems(newItems);
                  }}
                  required
                />
                <Input 
                  label="Rate *" 
                  type="number"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].rate = parseFloat(e.target.value) || 0;
                    setItems(newItems);
                  }}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="px-3 py-2 bg-gray-50 rounded-md">
                    ${(item.qty * item.rate).toFixed(2)}
                  </div>
                </div>
              </div>
              {items.length > 1 && (
                <Button 
                  type="button" 
                  variant="danger" 
                  onClick={() => removeItem(index)}
                  className="text-sm mt-2"
                >
                  Remove Item
                </Button>
              )}
            </div>
          ))}
          
          <Button type="button" variant="secondary" onClick={addItem}>
            Add Item
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="text-right mb-4">
            <p className="text-lg">
              <span className="font-semibold">Subtotal:</span> $
              {items.reduce((sum, item) => sum + (item.qty * item.rate), 0).toFixed(2)}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Tax:</span> $0.00
            </p>
            <p className="text-2xl font-bold">
              <span>Total:</span> $
              {items.reduce((sum, item) => sum + (item.qty * item.rate), 0).toFixed(2)}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Items'}
            </Button>
            <Link href={`/invoices/${id}`}>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
