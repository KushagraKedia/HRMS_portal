// src/hooks/usePlan.js
// Custom hook — fetches the company's active subscription plan
// Use this in any component: const { planName, features, loading } = usePlan();

import { useState, useEffect } from "react";
import { getPlanFeatures } from "../utils/planConfig";

export function usePlan() {
    const currentUser = JSON.parse(localStorage.getItem("gic_user") || "{}");
    const [planName,  setPlanName]  = useState(null);
    const [features,  setFeatures]  = useState(getPlanFeatures("none"));
    const [loading,   setLoading]   = useState(true);

    useEffect(() => {
        if (!currentUser.adminId) { setLoading(false); return; }

        fetch(`http://localhost:5000/api/subscriptions/active?adminId=${currentUser.adminId}`)
            .then(r => r.json())
            .then(data => {
                const name = data?.planName || "none";
                setPlanName(name);
                setFeatures(getPlanFeatures(name));
            })
            .catch(() => {
                setPlanName("none");
                setFeatures(getPlanFeatures("none"));
            })
            .finally(() => setLoading(false));
    }, []);

    return { planName, features, loading };
}
