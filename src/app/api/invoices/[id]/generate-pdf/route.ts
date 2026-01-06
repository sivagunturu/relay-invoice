import { NextRequest, NextResponse } from 'next/server';
import { generateInvoicePDF } from '@/lib/actions/invoices';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Generating PDF for invoice:', id);
    const result = await generateInvoicePDF(id);
    console.log('PDF generation result:', result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
