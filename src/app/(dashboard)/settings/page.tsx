import { getSettings, updateSettings } from '@/lib/actions/settings';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogoUpload } from '@/components/settings/logo-upload';

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Organization Settings</h1>

      {/* Logo Upload Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Company Logo</h2>
        <LogoUpload currentLogoUrl={settings.logo_url} />
      </Card>

      {/* Company Information */}
      <Card>
        <form action={updateSettings}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              <Input 
                label="Company Name *" 
                name="companyName" 
                defaultValue={settings.company_name}
                required 
              />
              <Input 
                label="Address Line 1" 
                name="addressLine1" 
                defaultValue={settings.address_line1 || ''}
              />
              <Input 
                label="Address Line 2" 
                name="addressLine2" 
                defaultValue={settings.address_line2 || ''}
              />
              <Input 
                label="Address Line 3" 
                name="addressLine3" 
                defaultValue={settings.address_line3 || ''}
              />
              <Input 
                label="Email" 
                name="email" 
                type="email"
                defaultValue={settings.email || ''}
              />
              <Input 
                label="Phone" 
                name="phone" 
                defaultValue={settings.phone || ''}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Invoice Defaults</h2>
              <Input 
                label="Default Terms *" 
                name="defaultTerms" 
                defaultValue={settings.default_terms}
                required
                placeholder="Net 60"
              />
              <Input 
                label="Default Currency *" 
                name="defaultCurrency" 
                defaultValue={settings.default_currency}
                required
                placeholder="USD"
              />
              <Input 
                label="Invoice Prefix *" 
                name="invoicePrefix" 
                defaultValue={settings.invoice_prefix}
                required
                placeholder="INV"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
              <Input 
                label="Payable To" 
                name="payable_to" 
                defaultValue={settings.payment_instructions?.payable_to || ''}
              />
              <Input 
                label="Bank Name" 
                name="bank_name" 
                defaultValue={settings.payment_instructions?.bank_name || ''}
              />
              <Input 
                label="Routing Number" 
                name="routing_number" 
                defaultValue={settings.payment_instructions?.routing_number || ''}
              />
              <Input 
                label="Account Number" 
                name="account_number" 
                defaultValue={settings.payment_instructions?.account_number || ''}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Compliance & Footer</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compliance Statement
                </label>
                <textarea
                  name="complianceText"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={settings.compliance_text || ''}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Footer Note
                </label>
                <textarea
                  name="footerNote"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={settings.footer_note || ''}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
