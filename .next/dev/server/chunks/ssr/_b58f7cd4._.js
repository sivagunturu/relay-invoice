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
"[project]/.next-internal/server/app/(dashboard)/consultants/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
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
}),
"[project]/.next-internal/server/app/(dashboard)/consultants/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
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
    "607bb4cdc0facace53b8246bcee24f4e42fc511892",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateConsultant"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$dashboard$292f$consultants$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(dashboard)/consultants/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$consultants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/consultants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$organizations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/organizations.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_b58f7cd4._.js.map