// src/utils/planConfig.js
// Central config — defines what each plan unlocks
// Import this wherever you need to check access

export const PLAN_FEATURES = {
    "none": {
        dashboard:      true,
        subscription:   true,
        tickets:        false,
        payroll:        false,
        leads:          false,
        accounts:       false,
        contacts:       false,
        opportunities:  false,
        emailTemplates: false,
        manageStaff:    false,
        maxStaff:       0,
        maxLeads:       0,
    },
    "Starter": {
        dashboard:      true,
        subscription:   true,
        tickets:        true,
        payroll:        true,
        leads:          true,
        accounts:       false,
        contacts:       false,
        opportunities:  false,
        emailTemplates: false,
        manageStaff:    true,
        maxStaff:       3,
        maxLeads:       50,
    },
    "Professional": {
        dashboard:      true,
        subscription:   true,
        tickets:        true,
        payroll:        true,
        leads:          true,
        accounts:       true,
        contacts:       true,
        opportunities:  true,
        emailTemplates: true,
        manageStaff:    true,
        maxStaff:       10,
        maxLeads:       500,
    },
    "Growth": {
        dashboard:      true,
        subscription:   true,
        tickets:        true,
        payroll:        true,
        leads:          true,
        accounts:       true,
        contacts:       true,
        opportunities:  true,
        emailTemplates: true,
        manageStaff:    true,
        maxStaff:       25,
        maxLeads:       1000,
    },
    "Enterprise": {
        dashboard:      true,
        subscription:   true,
        tickets:        true,
        payroll:        true,
        leads:          true,
        accounts:       true,
        contacts:       true,
        opportunities:  true,
        emailTemplates: true,
        manageStaff:    true,
        maxStaff:       999,
        maxLeads:       999999,
    },
};

// Get features for a plan name — defaults to "none" if not found
export const getPlanFeatures = (planName) => {
    return PLAN_FEATURES[planName] || PLAN_FEATURES["none"];
};
