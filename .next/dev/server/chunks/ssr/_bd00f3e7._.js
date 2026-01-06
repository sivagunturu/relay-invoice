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
"[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00dc10cbc7500983cd6b205f43e4b56c74cc687a5a":"getConsultants","406d7a044e2b9b99a715d47ef642648d0a7013c3ce":"getConsultant","407400da6eba215d46ce0973051799786f3d9b2416":"deleteConsultant","40ad4351cf5b2da69cad21122749bc5f4c539c0c0c":"createConsultant","607bb4cdc0facace53b8246bcee24f4e42fc511892":"updateConsultant"},"",""] */ __turbopack_context__.s([
    "createConsultant",
    ()=>createConsultant,
    "deleteConsultant",
    ()=>deleteConsultant,
    "getConsultant",
    ()=>getConsultant,
    "getConsultants",
    ()=>getConsultants,
    "updateConsultant",
    ()=>updateConsultant
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
async function getConsultants() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { data, error } = await supabase.from('consultants').select('*').eq('org_id', org.id).order('name');
    if (error) throw new Error(error.message);
    return data;
}
async function getConsultant(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { data, error } = await supabase.from('consultants').select('*').eq('id', id).eq('org_id', org.id).single();
    if (error) throw new Error(error.message);
    return data;
}
async function createConsultant(formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["consultantSchema"].parse({
        name: formData.get('name'),
        defaultRate: formData.get('defaultRate'),
        unitType: formData.get('unitType') || 'hour',
        defaultDescription: formData.get('defaultDescription')
    });
    const { error } = await supabase.from('consultants').insert({
        ...data,
        org_id: org.id,
        default_rate: data.defaultRate.toString()
    });
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/consultants');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/consultants');
}
async function updateConsultant(id, formData) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$schemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["consultantSchema"].parse({
        name: formData.get('name'),
        defaultRate: formData.get('defaultRate'),
        unitType: formData.get('unitType') || 'hour',
        defaultDescription: formData.get('defaultDescription')
    });
    const { error } = await supabase.from('consultants').update({
        ...data,
        default_rate: data.defaultRate.toString()
    }).eq('id', id).eq('org_id', org.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/consultants');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/consultants');
}
async function deleteConsultant(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const org = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"])();
    if (!org) throw new Error('No organization found');
    const { error } = await supabase.from('consultants').delete().eq('id', id).eq('org_id', org.id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/consultants');
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getConsultants,
    getConsultant,
    createConsultant,
    updateConsultant,
    deleteConsultant
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getConsultants, "00dc10cbc7500983cd6b205f43e4b56c74cc687a5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getConsultant, "406d7a044e2b9b99a715d47ef642648d0a7013c3ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createConsultant, "40ad4351cf5b2da69cad21122749bc5f4c539c0c0c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateConsultant, "607bb4cdc0facace53b8246bcee24f4e42fc511892", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteConsultant, "407400da6eba215d46ce0973051799786f3d9b2416", null);
}),
"[project]/src/components/ui/card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function Card({ children, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white rounded-lg shadow p-6 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/input.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function Input({ label, className = '', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/input.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/input.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function Button({ variant = 'primary', className = '', ...props }) {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${baseStyles} ${variants[variant]} ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "$$RSC_SERVER_ACTION_1",
    ()=>$$RSC_SERVER_ACTION_1,
    "default",
    ()=>EditConsultantPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40452dbdb80a959a1e58f837e864b7430395291ff8":"$$RSC_SERVER_ACTION_1","600eff36b7f62c9c2ac8da4e29a4dc54d09564a7db":"$$RSC_SERVER_ACTION_0"},"",""] */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const $$RSC_SERVER_ACTION_0 = async function handleUpdate($$ACTION_CLOSURE_BOUND, formData) {
    var [$$ACTION_ARG_0] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decryptActionBoundArgs"])("600eff36b7f62c9c2ac8da4e29a4dc54d09564a7db", $$ACTION_CLOSURE_BOUND);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateConsultant"])($$ACTION_ARG_0, formData);
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "600eff36b7f62c9c2ac8da4e29a4dc54d09564a7db", null);
const $$RSC_SERVER_ACTION_1 = async function handleDelete($$ACTION_CLOSURE_BOUND) {
    var [$$ACTION_ARG_0] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["decryptActionBoundArgs"])("40452dbdb80a959a1e58f837e864b7430395291ff8", $$ACTION_CLOSURE_BOUND);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteConsultant"])($$ACTION_ARG_0);
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_1, "40452dbdb80a959a1e58f837e864b7430395291ff8", null);
async function EditConsultantPage({ params }) {
    const { id } = await params;
    const consultant = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConsultant"])(id);
    var handleUpdate = $$RSC_SERVER_ACTION_0.bind(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encryptActionBoundArgs"])("600eff36b7f62c9c2ac8da4e29a4dc54d09564a7db", id));
    var handleDelete = $$RSC_SERVER_ACTION_1.bind(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encryptActionBoundArgs"])("40452dbdb80a959a1e58f837e864b7430395291ff8", id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-8",
                children: "Edit Consultant"
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    action: handleUpdate,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Input"], {
                            label: "Consultant Name *",
                            name: "name",
                            defaultValue: consultant.name,
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Input"], {
                            label: "Default Rate *",
                            name: "defaultRate",
                            type: "number",
                            step: "0.01",
                            defaultValue: consultant.default_rate,
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Input"], {
                            label: "Unit Type",
                            name: "unitType",
                            defaultValue: consultant.unit_type
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Input"], {
                            label: "Default Description",
                            name: "defaultDescription",
                            defaultValue: consultant.default_description || ''
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    children: "Update Consultant"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/consultants",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "secondary",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    action: handleDelete,
                                    className: "ml-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        variant: "danger",
                                        children: "Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/.next-internal/server/app/(dashboard)/consultants/[id]/edit/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$consultants$2f5b$id$5d2f$edit$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)");
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
"[project]/.next-internal/server/app/(dashboard)/consultants/[id]/edit/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "000103f9874b7040b8d4cbbc620486096206d2ac25",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "0075c59babaf1e4bd99e17674d8556a7957a4dad3b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserOrganization"],
    "0086a0370c203ea1533a70f33d44e12071457751c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"],
    "00dc10cbc7500983cd6b205f43e4b56c74cc687a5a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConsultants"],
    "40452dbdb80a959a1e58f837e864b7430395291ff8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$consultants$2f5b$id$5d2f$edit$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_1"],
    "406d7a044e2b9b99a715d47ef642648d0a7013c3ce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConsultant"],
    "407400da6eba215d46ce0973051799786f3d9b2416",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteConsultant"],
    "4074b1ed48e46d3f6aba76d994e833378f65764ade",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40ad4351cf5b2da69cad21122749bc5f4c539c0c0c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createConsultant"],
    "40b0a4c873012936c9193d892ed73bf486509d8178",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signUp"],
    "600eff36b7f62c9c2ac8da4e29a4dc54d09564a7db",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$consultants$2f5b$id$5d2f$edit$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "607bb4cdc0facace53b8246bcee24f4e42fc511892",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateConsultant"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$dashboard$292f$consultants$2f5b$id$5d2f$edit$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$dashboard$292f$consultants$2f5b$id$5d2f$edit$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(dashboard)/consultants/[id]/edit/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$consultants$2f5b$id$5d2f$edit$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(dashboard)/consultants/[id]/edit/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_bd00f3e7._.js.map