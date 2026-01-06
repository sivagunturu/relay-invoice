module.exports = [
"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0075c59babaf1e4bd99e17674d8556a7957a4dad3b":"getUserOrganization"},"",""] */ __turbopack_context__.s([
    "getUserOrganization",
    ()=>getUserOrganization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getUserOrganization() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user) {
        console.log('No user found');
        return null;
    }
    console.log('Fetching org for user:', user.id);
    // Step 1: Get the org_member record
    const { data: membership, error: memberError } = await supabase.from('org_members').select('id, role, status, org_id').eq('user_id', user.id).eq('status', 'active').single();
    if (memberError || !membership) {
        console.error('Error fetching membership:', memberError);
        return null;
    }
    console.log('Found membership:', membership);
    // Step 2: Get the organization
    const { data: org, error: orgError } = await supabase.from('organizations').select('id, name, created_at').eq('id', membership.org_id).single();
    if (orgError || !org) {
        console.error('Error fetching organization:', orgError);
        return null;
    }
    console.log('Found organization:', org);
    return {
        id: org.id,
        name: org.name,
        role: membership.role
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUserOrganization
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserOrganization, "0075c59babaf1e4bd99e17674d8556a7957a4dad3b", null);
}),
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TIMEZONE",
    ()=>TIMEZONE,
    "calculateDueDate",
    ()=>calculateDueDate,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "getNextMonthStart",
    ()=>getNextMonthStart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns-tz/dist/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$formatInTimeZone$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns-tz/dist/esm/formatInTimeZone/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addMonths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addDays.js [app-rsc] (ecmascript)");
;
;
const TIMEZONE = 'America/Chicago';
function formatCurrency(amount) {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(num);
}
function formatDate(date, format = 'MMM dd, yyyy') {
    const d = typeof date === 'string' ? new Date(date) : date;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2d$tz$2f$dist$2f$esm$2f$formatInTimeZone$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatInTimeZone"])(d, TIMEZONE, format);
}
function getNextMonthStart(dayOfMonth) {
    const now = new Date();
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMonths"])(now, 1);
    next.setDate(dayOfMonth);
    next.setHours(0, 0, 0, 0);
    return next;
}
function calculateDueDate(issueDate, terms) {
    const match = terms.match(/Net (\d+)/i);
    const days = match ? parseInt(match[1]) : 30;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDays"])(issueDate, days);
}
}),
"[project]/src/lib/actions/invoices.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004c80a1f5bc18f25d82876ee761004ae2f456a614":"getInvoices","40a6cdae7232b564d67a1e6ce8305a618d1db220b5":"createInvoice","40c70c7d792031155aae556cc1f76deae09c78232f":"getInvoice","40e0105dd86394a118973e2580007ef5030d171550":"generateInvoicePDF","40e8e78d4482acaa713ea6fa8a0702629580270de4":"deleteInvoice","60d90105a6417fdb70fbf6f381ac03cfe5d5efb311":"updateInvoiceItems","60e2504b3602a7a3277cb4f9832c775a17c4db50dd":"createInvoiceFromTemplate"},"",""] */ __turbopack_context__.s([
    "createInvoice",
    ()=>createInvoice,
    "createInvoiceFromTemplate",
    ()=>createInvoiceFromTemplate,
    "deleteInvoice",
    ()=>deleteInvoice,
    "generateInvoicePDF",
    ()=>generateInvoicePDF,
    "getInvoice",
    ()=>getInvoice,
    "getInvoices",
    ()=>getInvoices,
    "updateInvoiceItems",
    ()=>updateInvoiceItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function getInvoices() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { data, error } = await supabase.from('invoices').select(`
      *,
      clients (id, name)
    `).eq('org_id', org.id).order('created_at', {
        ascending: false
    });
    if (error) throw new Error(error.message);
    return data;
}
async function getInvoice(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { data, error } = await supabase.from('invoices').select(`
      *,
      clients (*),
      invoice_items (*)
    `).eq('id', id).eq('org_id', org.id).single();
    if (error) throw new Error(error.message);
    return data;
}
async function createInvoiceFromTemplate(templateId, month) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"])();
    if (!org || !user) throw new Error('Authentication required');
    // Get template with items
    const { data: template } = await supabase.from('invoice_templates').select(`
      *,
      clients (*),
      invoice_template_items (*)
    `).eq('id', templateId).eq('org_id', org.id).single();
    if (!template) throw new Error('Template not found');
    // Get org settings for invoice numbering
    const { data: settings } = await supabase.from('org_settings').select('*').eq('org_id', org.id).single();
    if (!settings) throw new Error('Settings not found');
    // Generate invoice number using database function
    const { data: invoiceNumberResult } = await supabase.rpc('generate_invoice_number', {
        p_org_id: org.id,
        p_month: month
    });
    const invoiceNumber = invoiceNumberResult;
    // Calculate dates
    const issueDate = new Date();
    const dueDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateDueDate"])(issueDate, settings.default_terms);
    // Create invoice
    const { data: invoice, error: invoiceError } = await supabase.from('invoices').insert({
        org_id: org.id,
        client_id: template.client_id,
        template_id: templateId,
        invoice_number: invoiceNumber,
        issue_date: issueDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        month,
        status: 'draft',
        terms: settings.default_terms,
        currency: settings.default_currency,
        payment_instructions: settings.payment_instructions,
        compliance_text: settings.compliance_text
    }).select().single();
    if (invoiceError) throw new Error(invoiceError.message);
    // Create invoice items from template
    if (template.invoice_template_items && template.invoice_template_items.length > 0) {
        const items = template.invoice_template_items.map((item, index)=>({
                org_id: org.id,
                invoice_id: invoice.id,
                description: item.description,
                qty: item.qty_default,
                rate: item.rate_default,
                amount: parseFloat(item.qty_default) * parseFloat(item.rate_default),
                sort_order: index
            }));
        await supabase.from('invoice_items').insert(items);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/invoices');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/invoices/${invoice.id}/edit`);
}
async function createInvoice(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const clientId = formData.get('clientId');
    const issueDate = formData.get('issueDate');
    const month = formData.get('month');
    const terms = formData.get('terms');
    const currency = formData.get('currency');
    // Get org settings
    const { data: settings } = await supabase.from('org_settings').select('*').eq('org_id', org.id).single();
    if (!settings) throw new Error('Settings not found');
    // Generate invoice number
    const { data: invoiceNumberResult } = await supabase.rpc('generate_invoice_number', {
        p_org_id: org.id,
        p_month: month
    });
    const invoiceNumber = invoiceNumberResult;
    const dueDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateDueDate"])(new Date(issueDate), terms);
    const { data: invoice, error } = await supabase.from('invoices').insert({
        org_id: org.id,
        client_id: clientId,
        invoice_number: invoiceNumber,
        issue_date: issueDate,
        due_date: dueDate.toISOString().split('T')[0],
        month,
        status: 'draft',
        terms,
        currency,
        payment_instructions: settings.payment_instructions,
        compliance_text: settings.compliance_text
    }).select().single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/invoices');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/invoices/${invoice.id}/edit`);
}
async function updateInvoiceItems(invoiceId, itemsJson) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const items = JSON.parse(itemsJson);
    // Calculate totals
    let subtotal = 0;
    items.forEach((item)=>{
        subtotal += parseFloat(item.qty) * parseFloat(item.rate);
    });
    const tax = 0; // Phase 1: no tax
    const total = subtotal + tax;
    // Delete existing items
    await supabase.from('invoice_items').delete().eq('invoice_id', invoiceId);
    // Insert new items
    const itemsToInsert = items.map((item, index)=>({
            org_id: org.id,
            invoice_id: invoiceId,
            description: item.description,
            qty: item.qty,
            rate: item.rate,
            amount: parseFloat(item.qty) * parseFloat(item.rate),
            sort_order: index
        }));
    await supabase.from('invoice_items').insert(itemsToInsert);
    // Update invoice totals
    await supabase.from('invoices').update({
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        total: total.toString()
    }).eq('id', invoiceId).eq('org_id', org.id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/invoices/${invoiceId}`);
    return {
        success: true
    };
}
async function generateInvoicePDF(invoiceId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServiceClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"])();
    if (!org || !user) throw new Error('Authentication required');
    // Create job for PDF generation (using correct column names)
    const { data: job, error } = await supabase.from('jobs').insert({
        org_id: org.id,
        job_type: 'generate_pdf',
        metadata: {
            invoice_id: invoiceId,
            user_id: user.id
        },
        status: 'queued',
        attempts: 0
    }).select().single();
    if (error) throw new Error(error.message);
    // Create audit log
    await supabase.from('audit_log').insert({
        org_id: org.id,
        user_id: user.id,
        action: 'generate_pdf_queued',
        entity_type: 'invoice',
        entity_id: invoiceId,
        metadata: {
            job_id: job.id
        }
    });
    return {
        success: true,
        jobId: job.id
    };
}
async function deleteInvoice(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { error } = await supabase.from('invoices').delete().eq('id', id).eq('org_id', org.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/invoices');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getInvoices,
    getInvoice,
    createInvoiceFromTemplate,
    createInvoice,
    updateInvoiceItems,
    generateInvoicePDF,
    deleteInvoice
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInvoices, "004c80a1f5bc18f25d82876ee761004ae2f456a614", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInvoice, "40c70c7d792031155aae556cc1f76deae09c78232f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createInvoiceFromTemplate, "60e2504b3602a7a3277cb4f9832c775a17c4db50dd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createInvoice, "40a6cdae7232b564d67a1e6ce8305a618d1db220b5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateInvoiceItems, "60d90105a6417fdb70fbf6f381ac03cfe5d5efb311", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateInvoicePDF, "40e0105dd86394a118973e2580007ef5030d171550", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteInvoice, "40e8e78d4482acaa713ea6fa8a0702629580270de4", null);
}),
"[project]/.next-internal/server/app/(dashboard)/invoices/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/invoices.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/invoices.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(dashboard)/invoices/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/invoices.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000103f9874b7040b8d4cbbc620486096206d2ac25",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "004c80a1f5bc18f25d82876ee761004ae2f456a614",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInvoices"],
    "0075c59babaf1e4bd99e17674d8556a7957a4dad3b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"],
    "0086a0370c203ea1533a70f33d44e12071457751c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"],
    "4074b1ed48e46d3f6aba76d994e833378f65764ade",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40a6cdae7232b564d67a1e6ce8305a618d1db220b5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createInvoice"],
    "40b0a4c873012936c9193d892ed73bf486509d8178",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signUp"],
    "40c70c7d792031155aae556cc1f76deae09c78232f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getInvoice"],
    "40e0105dd86394a118973e2580007ef5030d171550",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateInvoicePDF"],
    "40e8e78d4482acaa713ea6fa8a0702629580270de4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteInvoice"],
    "60d90105a6417fdb70fbf6f381ac03cfe5d5efb311",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateInvoiceItems"],
    "60e2504b3602a7a3277cb4f9832c775a17c4db50dd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createInvoiceFromTemplate"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$dashboard$292f$invoices$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(dashboard)/invoices/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/lib/actions/invoices.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$invoices$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/invoices.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_2fe409cc._.js.map