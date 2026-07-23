// src/components/PlanGate.jsx
// Wrap any page with this to restrict access based on plan
// Usage: <PlanGate feature="accounts"><Accounts/></PlanGate>

import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { usePlan } from "../hooks/usePlan";

function PlanGate({ feature, children }) {
    const navigate          = useNavigate();
    const { features, planName, loading } = usePlan();

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
            <div className="text-gray-400 text-sm">Loading...</div>
        </div>
    );

    // If feature is unlocked — show the page
    if (features[feature]) return children;

    // Feature is locked — show upgrade screen
    const featureLabels = {
        tickets:        "Tickets",
        payroll:        "Payroll",
        leads:          "Leads & CRM",
        accounts:       "Accounts",
        contacts:       "Contacts",
        opportunities:  "Opportunities",
        emailTemplates: "Email Templates",
        manageStaff:    "Manage Staff",
    };

    const requiredPlan = {
        tickets:        "Starter",
        payroll:        "Starter",
        leads:          "Starter",
        accounts:       "Professional",
        contacts:       "Professional",
        opportunities:  "Professional",
        emailTemplates: "Professional",
        manageStaff:    "Starter",
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA] px-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={28} className="text-orange-500"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Locked</h2>
                <p className="text-gray-500 mb-1">
                    <span className="font-semibold text-gray-700">{featureLabels[feature] || feature}</span> is not available on your current plan.
                </p>
                {planName && planName !== "none" ? (
                    <p className="text-gray-400 text-sm mb-6">
                        You are on the <span className="font-semibold text-orange-500">{planName}</span> plan. Upgrade to <span className="font-semibold text-orange-500">{requiredPlan[feature]}</span> or higher to unlock this.
                    </p>
                ) : (
                    <p className="text-gray-400 text-sm mb-6">
                        You don't have an active subscription. Subscribe to a plan to unlock this feature.
                    </p>
                )}
                <button onClick={() => navigate("/company/subscription")}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl cursor-pointer transition-colors">
                    {planName && planName !== "none" ? "Upgrade Plan →" : "View Plans →"}
                </button>
                <button onClick={() => navigate(-1)} className="mt-3 text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default PlanGate;
