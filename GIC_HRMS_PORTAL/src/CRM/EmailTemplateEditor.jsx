import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import messageIcon from "./assests_crm/message.png"
import personIcon from "./assests_crm/person9.webp"

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Save, ArrowLeft, Eye, EyeOff, Plus } from "lucide-react";

const API = "http://localhost:5000/api/email-templates";

const CATEGORIES   = ["Welcome", "Follow Up", "Proposal", "Meeting Request", "Nurture", "Closing"];
const VARIABLES    = ["{{name}}", "{{email}}", "{{company}}", "{{value}}", "{{assignedTo}}", "{{date}}"];
const SAMPLE_DATA  = { "{{name}}": "John Smith", "{{email}}": "john@gmail.com", "{{company}}": "BrightWave Innovations", "{{value}}": "$3,50,000", "{{assignedTo}}": "Priya Sharma", "{{date}}": new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" }) };

const STARTER_TEMPLATES = {
    "Welcome": `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <h2 style="color:#E97316">Welcome to GIC FOLKS, {{name}}! 👋</h2>
  <p>Thank you for reaching out to us. We're excited to connect with you.</p>
  <p>Our team will be in touch shortly to discuss how we can help you.</p>
  <br/>
  <p>Best regards,<br/><strong>{{assignedTo}}</strong><br/>GIC FOLKS Team</p>
</div>`,
    "Follow Up": `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <h2 style="color:#E97316">Following up — {{name}}</h2>
  <p>Hi {{name}},</p>
  <p>I wanted to follow up on our recent conversation about the {{company}} opportunity.</p>
  <p>Could we schedule a quick call this week to move things forward?</p>
  <br/>
  <p>Best regards,<br/><strong>{{assignedTo}}</strong><br/>GIC FOLKS Team</p>
</div>`,
    "Proposal": `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <h2 style="color:#E97316">Proposal for {{company}}</h2>
  <p>Hi {{name}},</p>
  <p>Please find attached our proposal for the deal worth <strong>{{value}}</strong>.</p>
  <p>We believe this is a great fit for your needs. Let us know if you have any questions.</p>
  <br/>
  <p>Best regards,<br/><strong>{{assignedTo}}</strong><br/>GIC FOLKS Team</p>
</div>`,
    "Meeting Request": `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <h2 style="color:#E97316">Meeting Request — {{name}}</h2>
  <p>Hi {{name}},</p>
  <p>I'd love to schedule a meeting to discuss the opportunity with {{company}} further.</p>
  <p>Could you please share your availability for this week?</p>
  <br/>
  <p>Best regards,<br/><strong>{{assignedTo}}</strong><br/>GIC FOLKS Team</p>
</div>`,
    "Nurture": `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <h2 style="color:#E97316">Keeping in touch — {{name}}</h2>
  <p>Hi {{name}},</p>
  <p>I wanted to check in and share some updates that might be relevant to {{company}}.</p>
  <p>We're here whenever you're ready to move forward.</p>
  <br/>
  <p>Best regards,<br/><strong>{{assignedTo}}</strong><br/>GIC FOLKS Team</p>
</div>`,
    "Closing": `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
  <h2 style="color:#E97316">Ready to close — {{name}}?</h2>
  <p>Hi {{name}},</p>
  <p>We're excited about the possibility of working with {{company}} on this <strong>{{value}}</strong> opportunity.</p>
  <p>Let's finalize the details and get started. Are you ready to move forward?</p>
  <br/>
  <p>Best regards,<br/><strong>{{assignedTo}}</strong><br/>GIC FOLKS Team</p>
</div>`
};

function EmailTemplateEditor() {
    const navigate    = useNavigate();
    const location    = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");
    const authHeaders = { "Content-Type": "application/json", "x-user-id": currentUser.id };

    const existingTemplate = location.state?.template || null;
    const isEditing        = !!existingTemplate;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPreview,  setShowPreview] = useState(false);
    const [saving,       setSaving]      = useState(false);
    const [saveError,    setSaveError]   = useState("");

    const [form, setForm] = useState({
        name:     existingTemplate?.name     || "",
        category: existingTemplate?.category || "Follow Up",
        subject:  existingTemplate?.subject  || "",
        body:     existingTemplate?.body     || STARTER_TEMPLATES["Follow Up"],
    });

    // When category changes, offer starter template
    const handleCategoryChange = (cat) => {
        setForm(p => ({
            ...p,
            category: cat,
            body: STARTER_TEMPLATES[cat] || p.body
        }));
    };

    const insertVariable = (variable) => {
        setForm(p => ({ ...p, body: p.body + variable }));
    };

    const renderPreview = (text) => {
        let result = text;
        Object.entries(SAMPLE_DATA).forEach(([key, val]) => { result = result.replaceAll(key, val); });
        return result;
    };

    const handleSave = async () => {
        if (!form.name.trim() || !form.subject.trim() || !form.body.trim()) {
            setSaveError("Name, subject and body are required."); return;
        }
        setSaving(true);
        setSaveError("");
        try {
            const url    = isEditing ? `${API}/${existingTemplate.id}` : API;
            const method = isEditing ? "PATCH" : "POST";
            const r = await fetch(url, {
                method, headers: authHeaders,
                body: JSON.stringify({ ...form, adminId: currentUser.adminId })
            });
            if (!r.ok) { const e = await r.json(); setSaveError(e.error || "Failed to save."); setSaving(false); return; }
            navigate("/CRM/EmailTemplates");
        } catch { setSaveError("Could not reach server."); }
        setSaving(false);
    };

    const handleLogout = () => { localStorage.removeItem("gic_user"); navigate("/"); };

    return (
        <div className="flex h-screen overflow-hidden">
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
            <button onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"><Menu size={22}/></button>

            <div className={`fixed lg:static top-0 left-0 z-50 h-screen transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="relative h-full">
                    <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden z-50"><X size={22}/></button>
                    <Sidebar/>
                </div>
            </div>

            <div className="w-full bg-[#F8F9FA] text-black flex-1 h-screen overflow-y-auto">

                {/* Navbar */}
                <div className="w-full border shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-gray-200 flex items-center justify-between p-3 bg-white">
                    <span className="ml-12 md:ml-10 text-2xl md:text-4xl font-bold">GIC FOLKS</span>
                    <div className="flex gap-2 md:gap-4 mr-2 md:mr-5 items-center">
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer hidden md:block"><img src={fullScreen} alt="" className="h-4 w-4"/></button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-xl hover:cursor-pointer"><img src={messageIcon} alt="" className="h-4 w-4"/></button>
                        <button onClick={handleLogout} className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer hidden md:block">Logout</button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Breadcrumb + Actions */}
                <div className="mx-3 md:mx-6 mt-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate("/CRM/EmailTemplates")} className="flex items-center gap-1 text-gray-500 hover:text-black hover:cursor-pointer">
                            <ArrowLeft size={16}/>
                        </button>
                        <span onClick={() => navigate("/CRM/EmailTemplates")} className="text-gray-500 hover:text-black hover:cursor-pointer text-sm font-medium">Email Templates</span>
                        <span className="text-gray-400">/</span>
                        <span className="font-semibold text-sm">{isEditing ? `Edit: ${existingTemplate.name}` : "New Template"}</span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowPreview(p => !p)}
                            className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer transition-colors">
                            {showPreview ? <><EyeOff size={14}/> Hide Preview</> : <><Eye size={14}/> Show Preview</>}
                        </button>
                        <button onClick={handleSave} disabled={saving}
                            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg px-4 py-1.5 text-sm font-semibold text-white hover:cursor-pointer transition-colors">
                            <Save size={14}/> {saving ? "Saving..." : "Save Template"}
                        </button>
                    </div>
                </div>

                {saveError && (
                    <div className="mx-3 md:mx-6 mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{saveError}</div>
                )}

                {/* Main Editor Layout */}
                <div className={`mx-3 md:mx-6 mt-5 mb-8 grid gap-5 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-3xl"}`}>

                    {/* LEFT — Settings + Editor */}
                    <div className="flex flex-col gap-4">

                        {/* Basic Info */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-5">
                            <p className="font-semibold text-base mb-4">Template Settings</p>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Template Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="e.g. Welcome Email" value={form.name}
                                        onChange={e => setForm(p => ({...p, name: e.target.value}))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Category</label>
                                    <select value={form.category} onChange={e => handleCategoryChange(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">Changing category loads a starter template for that type.</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Subject Line <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="e.g. Welcome to GIC FOLKS, {{name}}!" value={form.subject}
                                        onChange={e => setForm(p => ({...p, subject: e.target.value}))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                                </div>
                            </div>
                        </div>

                        {/* Variables */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-5">
                            <p className="font-semibold text-base mb-1">Available Variables</p>
                            <p className="text-xs text-gray-400 mb-3">Click to insert into body. These are replaced with real lead data when sending.</p>
                            <div className="flex gap-2 flex-wrap">
                                {VARIABLES.map(v => (
                                    <button key={v} onClick={() => insertVariable(v)}
                                        className="text-xs px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-mono hover:bg-blue-100 hover:cursor-pointer transition-colors flex items-center gap-1">
                                        <Plus size={10}/>{v}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-1 text-xs text-gray-400">
                                {Object.entries(SAMPLE_DATA).map(([k,v]) => (
                                    <div key={k}><span className="font-mono text-blue-500">{k}</span> → {v}</div>
                                ))}
                            </div>
                        </div>

                        {/* Body Editor */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-5">
                            <p className="font-semibold text-base mb-1">Email Body <span className="text-red-500">*</span></p>
                            <p className="text-xs text-gray-400 mb-3">Write HTML or plain text. Use variables above for dynamic content.</p>
                            <textarea
                                rows={16}
                                value={form.body}
                                onChange={e => setForm(p => ({...p, body: e.target.value}))}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
                                placeholder="Write your HTML email body here..."/>
                        </div>
                    </div>

                    {/* RIGHT — Live Preview */}
                    {showPreview && (
                        <div className="flex flex-col gap-4">
                            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] p-5 sticky top-4">
                                <p className="font-semibold text-base mb-1">Live Preview</p>
                                <p className="text-xs text-gray-400 mb-3">Variables replaced with sample data</p>

                                {/* Subject preview */}
                                <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                                    <p className="text-xs text-gray-400">Subject:</p>
                                    <p className="text-sm font-semibold mt-0.5">{renderPreview(form.subject) || "No subject yet"}</p>
                                </div>

                                {/* Email preview */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="bg-orange-500 px-5 py-3">
                                        <p className="text-white font-bold">GIC FOLKS</p>
                                    </div>
                                    <div className="p-5 min-h-32"
                                        dangerouslySetInnerHTML={{ __html: renderPreview(form.body) || "<p class='text-gray-400 text-sm'>Start typing your email body...</p>" }}/>
                                    <div className="bg-gray-50 px-5 py-2 border-t border-gray-100">
                                        <p className="text-xs text-gray-400 text-center">© 2026 GIC FOLKS — All rights reserved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-gray-200 justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>
        </div>
    );
}

export default EmailTemplateEditor;
