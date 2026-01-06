'use client';

import { Button } from '@/components/ui/button';

export function ViewPDFButton({ invoiceNumber, orgId }: { invoiceNumber: string; orgId: string }) {
  function handleView() {
    const pdfUrl = `https://wsjedcqjyjrtvmucteaj.supabase.co/storage/v1/object/public/invoices/${orgId}/${invoiceNumber}.pdf`;
    window.open(pdfUrl, '_blank');
  }

  return (
    <Button onClick={handleView} variant="secondary">
      View PDF
    </Button>
  );
}
