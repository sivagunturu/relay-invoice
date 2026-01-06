'use client';

import { useState } from 'react';
import { createTemplate } from '@/lib/actions/templates';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewTemplatePage() {
  const [items, setItems] = useState([{ consultantId: '', description: '', qtyDefault: 0, rateDefault: 0 }]);

  function addItem() {
    setItems([...items, { consultantId: '', description: '', qtyDefault: 0, rateDefault: 0 }]);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function handleSubmit(formData: FormData) {
    formData.append('items', JSON.stringify(items));
    await createTemplate(formData);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Create Invoice Template</h1>

      <Card>
        <form action={handleSubmit}>
          <Input label="Template Name *" name="name" required placeholder="Monthly C2C Services" />
          <Input label="Client ID *" name="clientId" required placeholder="Get from clients page" />
          <Input label="Day of Month (1-28) *" name="dayOfMonth" type="number" min="1" max="28" required defaultValue="1" />
          
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" name="autoSend" value="true" className="mr-2" />
              <span className="text-sm font-medium text-gray-700">Auto-send (Phase 1: Manual only)</span>
            </label>
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold mb-4">Template Items</h3>
            {items.map((item, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
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
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Default Qty" 
                    type="number"
                    step="0.01"
                    value={item.qtyDefault}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].qtyDefault = parseFloat(e.target.value) || 0;
                      setItems(newItems);
                    }}
                  />
                  <Input 
                    label="Default Rate *" 
                    type="number"
                    step="0.01"
                    value={item.rateDefault}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].rateDefault = parseFloat(e.target.value) || 0;
                      setItems(newItems);
                    }}
                    required
                  />
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

          <div className="flex gap-4 mt-6">
            <Button type="submit">Create Template</Button>
            <Link href="/templates">
              <Button type="button" variant="secondary">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
