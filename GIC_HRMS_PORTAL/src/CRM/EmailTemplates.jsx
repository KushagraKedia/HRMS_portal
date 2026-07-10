import Sidebar from "../components/sidebar"
import fullScreen from "./assests_crm/fullscreen.png"
import messageIcon from "./assests_crm/message.png"
import personIcon from "./assests_crm/person9.webp"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Plus, Pencil, Trash2, Eye, Mail, Search } from "lucide-react";

const API = "http://localhost:5000/api/email-templates";

const CATEGORY_COLORS = {
    "Welcome":        "bg-green-100 text-green-600 border-green-200",
    "Follow Up":      "bg-blue-100 text-blue-600 border-blue-200",
    "Proposal":       "bg-purple-100 text-purple-600 border-purple-200",
    "Meeting Request":"bg-yellow-100 text-yellow-600 border-yellow-200",
    "Nurture":        "bg-orange-100 text-orange-600 border-orange-200",
    "Closing":        "bg-red-100 text-red-600 border-red-200",
};

function EmailTemplates() {
    const navigate    = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");
    const authHeaders = { "Content-Type": "application/json", "x-user-id": currentUser.id };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [templates,   setTemplates]   = useState([]);
    const [loading,     setLoading]     = useState(true);
    const [search,      setSearch]      = useState("");
    const [filterCat,   setFilterCat]   = useState("All");

    // Preview modal
    const [previewTemplate, setPreviewTemplate] = useState(null);

    const fetchTemplates = async () => {
        try {
            const r = await fetch(`${API}?adminId=${currentUser.adminId}`, { headers: authHeaders });
            if (r.ok) setTemplates(await r.json());
        } catch {}
        setLoading(false);
    };

    useEffect(() => {
        if (!currentUser.id) navigate("/");
        fetchTemplates();
    }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete template "${name}"?`)) return;
        await fetch(`${API}/${id}`, { method: "DELETE", headers: authHeaders });
        setTemplates(prev => prev.filter(t => t.id !== id));
    };

    // Replace variables with sample data for preview
    const renderPreview = (html) => {
        return html
            .replace(/{{name}}/g,       "John Smith")
            .replace(/{{email}}/g,      "john@gmail.com")
            .replace(/{{company}}/g,    "BrightWave Innovations")
            .replace(/{{value}}/g,      "$3,50,000")
            .replace(/{{assignedTo}}/g, currentUser.name || "Sales Rep")
            .replace(/{{date}}/g,       new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" }));
    };

    const filtered = templates.filter(t =>
        (filterCat === "All" || t.category === filterCat) &&
        (t.name?.toLowerCase().includes(search.toLowerCase()) ||
         t.subject?.toLowerCase().includes(search.toLowerCase()))
    );

    const categories = ["All", ...Object.keys(CATEGORY_COLORS)];

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
                        <button onClick={handleLogout} className="text-xs font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:cursor-pointer transition-colors hidden md:block">Logout</button>
                        <button className="p-2 hover:bg-[#D0D0D0] rounded-full hover:cursor-pointer"><img src={personIcon} alt="" className="h-7 w-7 rounded-full"/></button>
                    </div>
                </div>

                {/* Header */}
                <div className="mx-3 md:mx-6 mt-5 flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Email Templates</h1>
                        <p className="text-sm text-gray-500 mt-0.5">🏠 &gt; CRM &gt; Email Templates</p>
                    </div>
                    <button onClick={() => navigate("/CRM/EmailTemplates/Editor")}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:cursor-pointer transition-colors">
                        <Plus size={16}/> New Template
                    </button>
                </div>

                {/* Search + Filter */}
                <div className="mx-3 md:mx-6 mt-4 flex gap-3 flex-wrap">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        <input type="text" placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)}
                            className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white w-64"/>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setFilterCat(cat)}
                                className={`text-xs px-3 py-1.5 rounded-lg border font-medium hover:cursor-pointer transition-colors ${filterCat === cat ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="mx-3 md:mx-6 mt-5 mb-8">
                    {loading ? (
                        <div className="text-center text-gray-400 py-20">Loading templates...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <Mail size={48} className="text-gray-300 mx-auto mb-3"/>
                            <p className="text-gray-400 font-medium">No templates yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click "New Template" to create your first email template</p>
                            <button onClick={() => navigate("/CRM/EmailTemplates/Editor")}
                                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:cursor-pointer transition-colors inline-flex items-center gap-2">
                                <Plus size={16}/> Create First Template
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filtered.map(template => (
                                <div key={template.id} className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
                                    {/* Color bar */}
                                    <div className="h-1.5 w-full bg-orange-500"/>

                                    <div className="p-5 flex flex-col gap-3 flex-1">
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-base truncate">{template.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5 truncate">Subject: {template.subject}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${CATEGORY_COLORS[template.category] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                                {template.category}
                                            </span>
                                        </div>

                                        {/* Body preview */}
                                        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 leading-relaxed line-clamp-3 border border-gray-100"
                                            dangerouslySetInnerHTML={{ __html: template.body?.replace(/<[^>]*>/g, " ").substring(0, 120) + "..." }}/>

                                        {/* Variables used */}
                                        <div className="flex gap-1 flex-wrap">
                                            {["{{name}}", "{{email}}", "{{company}}", "{{value}}"].filter(v => template.body?.includes(v) || template.subject?.includes(v)).map(v => (
                                                <span key={v} className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded font-mono">{v}</span>
                                            ))}
                                        </div>

                                        <p className="text-xs text-gray-400 mt-auto">Created {new Date(template.createdAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="border-t border-gray-100 p-3 flex items-center justify-end gap-3">
                                        <button onClick={() => setPreviewTemplate(template)}
                                            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-orange-500 hover:cursor-pointer transition-colors">
                                            <Eye size={14}/> Preview
                                        </button>
                                        <button onClick={() => navigate("/CRM/EmailTemplates/Editor", { state: { template } })}
                                            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-orange-500 hover:cursor-pointer transition-colors">
                                            <Pencil size={14}/> Edit
                                        </button>
                                        <button onClick={() => handleDelete(template.id, template.name)}
                                            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-500 hover:cursor-pointer transition-colors">
                                            <Trash2 size={14}/> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex bg-white h-10 border-t border-gray-200 justify-between p-2 w-full text-sm">
                    <p>Copyright-2026 ©KK.</p>
                    <p className="hidden md:block">Designed & Developed By Kushagra Kedia</p>
                </div>
            </div>

            {/* PREVIEW MODAL */}
            {previewTemplate && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <div>
                                <h2 className="text-lg font-bold">{previewTemplate.name}</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Subject: {renderPreview(previewTemplate.subject)}</p>
                            </div>
                            <button onClick={() => setPreviewTemplate(null)} className="text-gray-400 hover:text-red-500 hover:cursor-pointer"><X size={20}/></button>
                        </div>
                        <div className="p-5">
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-orange-500 px-6 py-4">
                                    <p className="text-white font-bold text-lg">GIC FOLKS</p>
                                </div>
                                <div className="p-6" dangerouslySetInnerHTML={{ __html: renderPreview(previewTemplate.body) }}/>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 text-center">© 2026 GIC FOLKS — All rights reserved</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 p-5 border-t border-gray-200">
                            <button onClick={() => setPreviewTemplate(null)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:cursor-pointer">Close</button>
                            <button onClick={() => { setPreviewTemplate(null); navigate("/CRM/EmailTemplates/Editor", { state: { template: previewTemplate } }); }}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-2 text-sm font-semibold text-white hover:cursor-pointer flex items-center justify-center gap-2">
                                <Pencil size={14}/> Edit Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmailTemplates;
