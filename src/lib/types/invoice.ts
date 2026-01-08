export type InvoiceType = 'C2C' | 'W2' | '1099';

export interface InvoiceItem {
  id?: string;
  invoice_id?: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  org_id: string;
  client_id: string;
  consultant_id?: string;
  invoice_number: string;
  invoice_type: InvoiceType;
  issue_date: string;
  due_date: string;
  terms: string;
  subtotal: number;
  tax_rate: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  compliance_text?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  clients?: Client;
  consultants?: Consultant;
  invoice_items?: InvoiceItem[];
}

export interface Client {
  id: string;
  org_id: string;
  name: string;
  email?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  address_line3?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  tax_id?: string;
  terms?: string;
  currency?: string;
  created_at?: string;
}

export interface Consultant {
  id: string;
  org_id: string;
  name: string;
  email?: string;
  phone?: string;
  default_rate?: number;
  unit_type?: string;
  default_description?: string;
  created_at?: string;
}

export interface OrgSettings {
  id?: string;
  org_id: string;
  company_name: string;
  address_line1?: string;
  address_line2?: string;
  address_line3?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  email?: string;
  phone?: string;
  tax_id?: string;
  logo_url?: string;
  default_terms?: string;
  default_currency?: string;
  invoice_prefix?: string;
  footer_note?: string;
  payment_instructions?: PaymentInstructions;
  compliance_text?: string;
  default_invoice_type?: InvoiceType;
}

export interface PaymentInstructions {
  payable_to?: string;
  bank_name?: string;
  routing_number?: string;
  account_number?: string;
  swift_code?: string;
  notes?: string;
}
