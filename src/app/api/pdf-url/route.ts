import { NextRequest, NextResponse } from 'next/server';
import { getSignedDownloadUrl } from '@/lib/aws/storage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('orgId');
    const invoiceNumber = searchParams.get('invoiceNumber');
    
    if (!orgId || !invoiceNumber) {
      return NextResponse.json(
        { error: 'Missing orgId or invoiceNumber' },
        { status: 400 }
      );
    }
    
    const key = `${orgId}/${invoiceNumber}.pdf`;
    const url = await getSignedDownloadUrl('invoices', key, 3600);
    
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Error getting PDF URL:', error);
    return NextResponse.json(
      { error: 'Failed to get PDF URL' },
      { status: 500 }
    );
  }
}
