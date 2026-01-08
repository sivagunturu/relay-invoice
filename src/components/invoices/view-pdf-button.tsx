'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ViewPDFButton({ invoiceNumber, orgId }: { invoiceNumber: string; orgId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleView() {
    setLoading(true);
    try {
      const response = await fetch(`/api/pdf-url?orgId=${orgId}&invoiceNumber=${invoiceNumber}`);
      const data = await response.json();
      
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Failed to get PDF URL:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleView} variant="secondary" disabled={loading}>
      {loading ? 'Loading...' : 'View PDF'}
    </Button>
  );
}
