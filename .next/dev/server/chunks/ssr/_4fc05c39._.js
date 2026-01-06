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
"[project]/src/lib/actions/clients.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"007e2b64d86f6a83ff8ce95461a84384a769a307fa":"getClients","403df7c6d20d9a4b4b75eee8e81f7fd20611c9ac5a":"getClient","4049221d5ccf1e410b97c8ba2735453331b6587096":"deleteClient","4092269913fa707c4f77b52e568430276e10ce3d66":"createClient","605fdb2fa5186ab08a8ece0c51e4b16abee2438b12":"updateClient"},"",""] */ __turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "deleteClient",
    ()=>deleteClient,
    "getClient",
    ()=>getClient,
    "getClients",
    ()=>getClients,
    "updateClient",
    ()=>updateClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations/schemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function getClients() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) {
        throw new Error('No organization found');
    }
    const { data, error } = await supabase.from('clients').select('*').eq('org_id', org.id).order('name');
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
async function getClient(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) {
        throw new Error('No organization found');
    }
    const { data, error } = await supabase.from('clients').select('*').eq('id', id).eq('org_id', org.id).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
async function createClient(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) {
        throw new Error('No organization found');
    }
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clientSchema"].parse({
        name: formData.get('name'),
        addressLine1: formData.get('addressLine1'),
        addressLine2: formData.get('addressLine2'),
        addressLine3: formData.get('addressLine3'),
        email: formData.get('email'),
        terms: formData.get('terms'),
        currency: formData.get('currency')
    });
    const { error } = await supabase.from('clients').insert({
        ...data,
        org_id: org.id
    });
    if (error) {
        throw new Error(error.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/clients');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/clients');
}
async function updateClient(id, formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) {
        throw new Error('No organization found');
    }
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clientSchema"].parse({
        name: formData.get('name'),
        addressLine1: formData.get('addressLine1'),
        addressLine2: formData.get('addressLine2'),
        addressLine3: formData.get('addressLine3'),
        email: formData.get('email'),
        terms: formData.get('terms'),
        currency: formData.get('currency')
    });
    const { error } = await supabase.from('clients').update(data).eq('id', id).eq('org_id', org.id);
    if (error) {
        throw new Error(error.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/clients');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/clients');
}
async function deleteClient(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) {
        throw new Error('No organization found');
    }
    const { error } = await supabase.from('clients').delete().eq('id', id).eq('org_id', org.id);
    if (error) {
        throw new Error(error.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/clients');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClients, "007e2b64d86f6a83ff8ce95461a84384a769a307fa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClient, "403df7c6d20d9a4b4b75eee8e81f7fd20611c9ac5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createClient, "4092269913fa707c4f77b52e568430276e10ce3d66", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateClient, "605fdb2fa5186ab08a8ece0c51e4b16abee2438b12", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteClient, "4049221d5ccf1e410b97c8ba2735453331b6587096", null);
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
"[project]/src/lib/actions/templates.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0003f88331bd785b058a2fc4b5cc0199801f55d046":"getTemplates","4000be2a512a3a87d0eec2516f58b18c4920a27677":"deleteTemplate","401b2a7e03125014afe8abdd53fc3b48f9a183337d":"getTemplate","40c9bd2f9d7d9a422796dcad9e40b739877d6c8e1e":"createTemplate","6084292bbcd6be8272721a3c4157d37ff83f629d8d":"updateTemplate"},"",""] */ __turbopack_context__.s([
    "createTemplate",
    ()=>createTemplate,
    "deleteTemplate",
    ()=>deleteTemplate,
    "getTemplate",
    ()=>getTemplate,
    "getTemplates",
    ()=>getTemplates,
    "updateTemplate",
    ()=>updateTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
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
async function getTemplates() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { data, error } = await supabase.from('invoice_templates').select(`
      *,
      clients (id, name)
    `).eq('org_id', org.id).order('name');
    if (error) throw new Error(error.message);
    return data;
}
async function getTemplate(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { data, error } = await supabase.from('invoice_templates').select(`
      *,
      clients (id, name),
      invoice_template_items (
        *,
        consultants (id, name)
      )
    `).eq('id', id).eq('org_id', org.id).single();
    if (error) throw new Error(error.message);
    return data;
}
async function createTemplate(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const clientId = formData.get('clientId');
    const name = formData.get('name');
    const dayOfMonth = parseInt(formData.get('dayOfMonth'));
    const autoSend = formData.get('autoSend') === 'true';
    const nextRunAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNextMonthStart"])(dayOfMonth);
    const { data: template, error: templateError } = await supabase.from('invoice_templates').insert({
        org_id: org.id,
        client_id: clientId,
        name,
        day_of_month: dayOfMonth,
        next_run_at: nextRunAt.toISOString(),
        auto_send: autoSend
    }).select().single();
    if (templateError) throw new Error(templateError.message);
    // Parse items from formData
    const itemsJson = formData.get('items');
    if (itemsJson) {
        const items = JSON.parse(itemsJson);
        const itemsToInsert = items.map((item, index)=>({
                org_id: org.id,
                template_id: template.id,
                consultant_id: item.consultantId || null,
                description: item.description,
                qty_default: item.qtyDefault || 0,
                rate_default: item.rateDefault,
                sort_order: index
            }));
        const { error: itemsError } = await supabase.from('invoice_template_items').insert(itemsToInsert);
        if (itemsError) throw new Error(itemsError.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/templates');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/templates');
}
async function updateTemplate(id, formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const clientId = formData.get('clientId');
    const name = formData.get('name');
    const dayOfMonth = parseInt(formData.get('dayOfMonth'));
    const autoSend = formData.get('autoSend') === 'true';
    const { error: templateError } = await supabase.from('invoice_templates').update({
        client_id: clientId,
        name,
        day_of_month: dayOfMonth,
        auto_send: autoSend
    }).eq('id', id).eq('org_id', org.id);
    if (templateError) throw new Error(templateError.message);
    // Delete existing items
    await supabase.from('invoice_template_items').delete().eq('template_id', id);
    // Insert new items
    const itemsJson = formData.get('items');
    if (itemsJson) {
        const items = JSON.parse(itemsJson);
        const itemsToInsert = items.map((item, index)=>({
                org_id: org.id,
                template_id: id,
                consultant_id: item.consultantId || null,
                description: item.description,
                qty_default: item.qtyDefault || 0,
                rate_default: item.rateDefault,
                sort_order: index
            }));
        const { error: itemsError } = await supabase.from('invoice_template_items').insert(itemsToInsert);
        if (itemsError) throw new Error(itemsError.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/templates');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/templates');
}
async function deleteTemplate(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { error } = await supabase.from('invoice_templates').delete().eq('id', id).eq('org_id', org.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/templates');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTemplates,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplates, "0003f88331bd785b058a2fc4b5cc0199801f55d046", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplate, "401b2a7e03125014afe8abdd53fc3b48f9a183337d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTemplate, "40c9bd2f9d7d9a422796dcad9e40b739877d6c8e1e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTemplate, "6084292bbcd6be8272721a3c4157d37ff83f629d8d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTemplate, "4000be2a512a3a87d0eec2516f58b18c4920a27677", null);
}),
"[project]/.next-internal/server/app/(dashboard)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/clients.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/templates.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/clients.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/templates.ts [app-rsc] (ecmascript)");
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
;
;
;
}),
"[project]/.next-internal/server/app/(dashboard)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/clients.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/templates.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000103f9874b7040b8d4cbbc620486096206d2ac25",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "0003f88331bd785b058a2fc4b5cc0199801f55d046",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTemplates"],
    "0075c59babaf1e4bd99e17674d8556a7957a4dad3b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"],
    "007e2b64d86f6a83ff8ce95461a84384a769a307fa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClients"],
    "0086a0370c203ea1533a70f33d44e12071457751c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"],
    "4000be2a512a3a87d0eec2516f58b18c4920a27677",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTemplate"],
    "401b2a7e03125014afe8abdd53fc3b48f9a183337d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTemplate"],
    "403df7c6d20d9a4b4b75eee8e81f7fd20611c9ac5a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"],
    "4049221d5ccf1e410b97c8ba2735453331b6587096",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteClient"],
    "4074b1ed48e46d3f6aba76d994e833378f65764ade",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "4092269913fa707c4f77b52e568430276e10ce3d66",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"],
    "40b0a4c873012936c9193d892ed73bf486509d8178",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signUp"],
    "40c9bd2f9d7d9a422796dcad9e40b739877d6c8e1e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTemplate"],
    "605fdb2fa5186ab08a8ece0c51e4b16abee2438b12",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateClient"],
    "6084292bbcd6be8272721a3c4157d37ff83f629d8d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTemplate"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$dashboard$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(dashboard)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/lib/actions/clients.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/lib/actions/templates.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$clients$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/clients.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/templates.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_4fc05c39._.js.map