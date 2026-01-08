export interface StateTaxConfig {
  code: string;
  name: string;
  salesTaxRate: number;
  hasServiceTax: boolean;
  c2cExempt: boolean;
  w2WithholdingRequired: boolean;
  complianceNotes: string;
}

export const US_STATES: StateTaxConfig[] = [
  { code: 'AL', name: 'Alabama', salesTaxRate: 4.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Professional consulting services are generally exempt from Alabama sales tax.' },
  { code: 'AK', name: 'Alaska', salesTaxRate: 0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Alaska has no state sales tax. Local taxes may apply.' },
  { code: 'AZ', name: 'Arizona', salesTaxRate: 5.6, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Professional services are not subject to Arizona Transaction Privilege Tax.' },
  { code: 'AR', name: 'Arkansas', salesTaxRate: 6.5, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Arkansas does not tax most professional services.' },
  { code: 'CA', name: 'California', salesTaxRate: 7.25, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'California does not impose sales tax on most professional services.' },
  { code: 'CO', name: 'Colorado', salesTaxRate: 2.9, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Colorado exempts most professional services from sales tax.' },
  { code: 'CT', name: 'Connecticut', salesTaxRate: 6.35, hasServiceTax: true, c2cExempt: false, w2WithholdingRequired: true, complianceNotes: 'Connecticut taxes certain computer and data processing services.' },
  { code: 'DE', name: 'Delaware', salesTaxRate: 0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Delaware has no sales tax.' },
  { code: 'FL', name: 'Florida', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Florida does not tax professional services.' },
  { code: 'GA', name: 'Georgia', salesTaxRate: 4.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Georgia exempts professional services from sales tax.' },
  { code: 'HI', name: 'Hawaii', salesTaxRate: 4.0, hasServiceTax: true, c2cExempt: false, w2WithholdingRequired: true, complianceNotes: 'Hawaii General Excise Tax applies to most services.' },
  { code: 'ID', name: 'Idaho', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Idaho exempts professional services from sales tax.' },
  { code: 'IL', name: 'Illinois', salesTaxRate: 6.25, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Illinois does not tax professional services.' },
  { code: 'IN', name: 'Indiana', salesTaxRate: 7.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Indiana exempts professional services from sales tax.' },
  { code: 'IA', name: 'Iowa', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Iowa exempts most professional services from sales tax.' },
  { code: 'KS', name: 'Kansas', salesTaxRate: 6.5, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Kansas exempts professional services from sales tax.' },
  { code: 'KY', name: 'Kentucky', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Kentucky exempts professional services from sales tax.' },
  { code: 'LA', name: 'Louisiana', salesTaxRate: 4.45, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Louisiana exempts professional services from sales tax.' },
  { code: 'ME', name: 'Maine', salesTaxRate: 5.5, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Maine exempts professional services from sales tax.' },
  { code: 'MD', name: 'Maryland', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Maryland exempts professional services from sales tax.' },
  { code: 'MA', name: 'Massachusetts', salesTaxRate: 6.25, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Massachusetts exempts professional services from sales tax.' },
  { code: 'MI', name: 'Michigan', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Michigan exempts professional services from sales tax.' },
  { code: 'MN', name: 'Minnesota', salesTaxRate: 6.875, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Minnesota exempts professional services from sales tax.' },
  { code: 'MS', name: 'Mississippi', salesTaxRate: 7.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Mississippi exempts professional services from sales tax.' },
  { code: 'MO', name: 'Missouri', salesTaxRate: 4.225, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Missouri exempts professional services from sales tax.' },
  { code: 'MT', name: 'Montana', salesTaxRate: 0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Montana has no sales tax.' },
  { code: 'NE', name: 'Nebraska', salesTaxRate: 5.5, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Nebraska exempts professional services from sales tax.' },
  { code: 'NV', name: 'Nevada', salesTaxRate: 6.85, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Nevada exempts professional services from sales tax.' },
  { code: 'NH', name: 'New Hampshire', salesTaxRate: 0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'New Hampshire has no sales tax.' },
  { code: 'NJ', name: 'New Jersey', salesTaxRate: 6.625, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'New Jersey exempts professional services from sales tax.' },
  { code: 'NM', name: 'New Mexico', salesTaxRate: 4.875, hasServiceTax: true, c2cExempt: false, w2WithholdingRequired: true, complianceNotes: 'New Mexico Gross Receipts Tax applies to most services.' },
  { code: 'NY', name: 'New York', salesTaxRate: 4.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'New York exempts professional services from sales tax.' },
  { code: 'NC', name: 'North Carolina', salesTaxRate: 4.75, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'North Carolina exempts professional services from sales tax.' },
  { code: 'ND', name: 'North Dakota', salesTaxRate: 5.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'North Dakota exempts professional services from sales tax.' },
  { code: 'OH', name: 'Ohio', salesTaxRate: 5.75, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Ohio exempts professional services from sales tax.' },
  { code: 'OK', name: 'Oklahoma', salesTaxRate: 4.5, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Oklahoma exempts professional services from sales tax.' },
  { code: 'OR', name: 'Oregon', salesTaxRate: 0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Oregon has no sales tax.' },
  { code: 'PA', name: 'Pennsylvania', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Pennsylvania exempts professional services from sales tax.' },
  { code: 'RI', name: 'Rhode Island', salesTaxRate: 7.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Rhode Island exempts professional services from sales tax.' },
  { code: 'SC', name: 'South Carolina', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'South Carolina exempts professional services from sales tax.' },
  { code: 'SD', name: 'South Dakota', salesTaxRate: 4.5, hasServiceTax: true, c2cExempt: false, w2WithholdingRequired: false, complianceNotes: 'South Dakota taxes most services.' },
  { code: 'TN', name: 'Tennessee', salesTaxRate: 7.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Tennessee exempts professional services from sales tax.' },
  { code: 'TX', name: 'Texas', salesTaxRate: 6.25, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Professional consulting services are not subject to Texas Sales & Use Tax.' },
  { code: 'UT', name: 'Utah', salesTaxRate: 6.1, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Utah exempts professional services from sales tax.' },
  { code: 'VT', name: 'Vermont', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Vermont exempts professional services from sales tax.' },
  { code: 'VA', name: 'Virginia', salesTaxRate: 5.3, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Virginia exempts professional services from sales tax.' },
  { code: 'WA', name: 'Washington', salesTaxRate: 6.5, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Washington exempts professional services from B&O tax on most consulting.' },
  { code: 'WV', name: 'West Virginia', salesTaxRate: 6.0, hasServiceTax: true, c2cExempt: false, w2WithholdingRequired: true, complianceNotes: 'West Virginia taxes certain services.' },
  { code: 'WI', name: 'Wisconsin', salesTaxRate: 5.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'Wisconsin exempts professional services from sales tax.' },
  { code: 'WY', name: 'Wyoming', salesTaxRate: 4.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: false, complianceNotes: 'Wyoming exempts professional services from sales tax.' },
  { code: 'DC', name: 'District of Columbia', salesTaxRate: 6.0, hasServiceTax: false, c2cExempt: true, w2WithholdingRequired: true, complianceNotes: 'DC exempts professional services from sales tax.' },
];

export type InvoiceType = 'C2C' | 'W2' | '1099';

export const INVOICE_TYPES: { value: InvoiceType; label: string; description: string }[] = [
  { value: 'C2C', label: 'Corp-to-Corp (C2C)', description: 'Business-to-business invoice. The contractor company is responsible for all taxes and employer obligations.' },
  { value: 'W2', label: 'W-2 Employee', description: 'Employee invoice with tax withholding. Employer handles payroll taxes and benefits.' },
  { value: '1099', label: '1099 Contractor', description: 'Independent contractor invoice. Contractor is responsible for self-employment taxes.' },
];

export const PAYMENT_TERMS = [
  { value: 'Net 15', label: 'Net 15', days: 15 },
  { value: 'Net 30', label: 'Net 30', days: 30 },
  { value: 'Net 45', label: 'Net 45', days: 45 },
  { value: 'Net 60', label: 'Net 60', days: 60 },
  { value: 'Due on Receipt', label: 'Due on Receipt', days: 0 },
];

export function getStateByCode(code: string): StateTaxConfig | undefined {
  return US_STATES.find(s => s.code === code);
}

export function calculateTax(
  subtotal: number,
  stateCode: string,
  invoiceType: InvoiceType
): { taxRate: number; taxAmount: number; isExempt: boolean; complianceNote: string } {
  const state = getStateByCode(stateCode);
  
  if (!state) {
    return { taxRate: 0, taxAmount: 0, isExempt: true, complianceNote: '' };
  }

  let isExempt = false;
  let taxRate = 0;
  
  if (invoiceType === 'C2C' && state.c2cExempt) {
    isExempt = true;
    taxRate = 0;
  } else if (state.hasServiceTax) {
    taxRate = state.salesTaxRate;
  }

  const taxAmount = isExempt ? 0 : (subtotal * taxRate) / 100;

  return {
    taxRate,
    taxAmount: Math.round(taxAmount * 100) / 100,
    isExempt,
    complianceNote: state.complianceNotes,
  };
}

export function generateComplianceText(
  invoiceType: InvoiceType,
  stateCode: string,
  companyName: string
): string {
  const state = getStateByCode(stateCode);
  
  if (!state) return '';

  switch (invoiceType) {
    case 'C2C':
      return `This invoice is issued on a Corp-to-Corp (C2C) basis. ${companyName} is responsible for all applicable federal and state employer obligations. ${state.complianceNotes}`;
    case 'W2':
      return `This invoice reflects W-2 employee services. All applicable federal and state withholding taxes have been calculated. The employer is responsible for payroll tax obligations.`;
    case '1099':
      return `This invoice is for independent contractor services (1099). The contractor is responsible for self-employment taxes. No withholding is applied.`;
    default:
      return '';
  }
}
