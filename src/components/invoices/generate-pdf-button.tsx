'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function GeneratePDFButton({ invoiceId }: { invoiceId: string }) {
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/generate-pdf`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      alert('PDF generation started! It will be ready in a few seconds.');
      
      // Refresh page after 5 seconds
      setTimeout(() => window.location.reload(), 5000);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Button onClick={handleGenerate} disabled={generating}>
      {generating ? 'Generating...' : 'Generate PDF'}
    </Button>
  );
}
