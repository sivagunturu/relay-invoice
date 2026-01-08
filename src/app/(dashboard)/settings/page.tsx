import { redirect } from 'next/navigation';
import { US_STATES, PAYMENT_TERMS, INVOICE_TYPES } from '@/lib/config/us-states';
import { LogoUpload } from '@/components/settings/logo-upload';
import { getSettings, updateSettings as updateSettingsAction } from '@/lib/actions/settings';
import { getUser } from '@/lib/actions/auth';
import { getUserOrganization } from '@/lib/actions/organizations';

async function updateSettings(formData: FormData) {
  'use server';

  const user = await getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const org = await getUserOrganization();
  if (!org) {
    redirect('/auth/login');
  }

  await updateSettingsAction(formData);
}

export default async function SettingsPage() {
  const user = await getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const org = await getUserOrganization();
  if (!org) {
    redirect('/auth/login');
  }

  const settings = await getSettings();

  const paymentInstructions = typeof settings?.payment_instructions === 'string'
    ? JSON.parse(settings.payment_instructions)
    : settings?.payment_instructions || {};

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Company Settings</h1>

      <form action={updateSettings} className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Company Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  defaultValue={settings?.company_name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={settings?.email || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={settings?.phone || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Business Address</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                defaultValue={settings?.address_line1 || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                defaultValue={settings?.address_line2 || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 3
              </label>
              <input
                type="text"
                name="addressLine3"
                defaultValue={settings?.address_line3 || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Invoice Defaults</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number Prefix
                </label>
                <input
                  type="text"
                  name="invoicePrefix"
                  placeholder="INV"
                  defaultValue={settings?.invoice_prefix || 'INV'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Payment Terms
                </label>
                <select
                  name="defaultTerms"
                  defaultValue={settings?.default_terms || 'Net 30'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PAYMENT_TERMS.map((term) => (
                    <option key={term.value} value={term.value}>
                      {term.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <select
                  name="defaultCurrency"
                  defaultValue={settings?.default_currency || 'USD'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Payment Instructions</h2>
          <p className="text-sm text-gray-500 mb-4">This information will appear on your invoices to help clients pay you.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payable To
              </label>
              <input
                type="text"
                name="payable_to"
                defaultValue={paymentInstructions?.payable_to || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                defaultValue={paymentInstructions?.bank_name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Routing Number
              </label>
              <input
                type="text"
                name="routing_number"
                defaultValue={paymentInstructions?.routing_number || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                defaultValue={paymentInstructions?.account_number || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Invoice Customization</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Footer Note
              </label>
              <textarea
                name="footerNote"
                rows={2}
                placeholder="e.g., Remit payment with Invoice # [number]. Thank you for your business!"
                defaultValue={settings?.footer_note || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Compliance Text
              </label>
              <textarea
                name="complianceText"
                rows={3}
                placeholder="Leave blank to use auto-generated compliance text based on invoice type and state"
                defaultValue={settings?.compliance_text || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                If left empty, compliance text will be auto-generated based on invoice type (C2C, W2, 1099) and state tax rules.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Company Logo</h2>
          <LogoUpload currentLogoUrl={settings?.logo_url} />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
