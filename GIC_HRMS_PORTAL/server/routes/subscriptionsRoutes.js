// routes/subscriptionsRoutes.js
const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router    = express.Router();
const DATA_FILE = path.join(__dirname, '../data/subscriptions.json');

function readData()   { if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]'); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeData(d) { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

// GET all subscriptions (SuperAdmin)
router.get('/', (req, res) => {
    try { res.json(readData()); }
    catch { res.status(500).json({ error: 'Failed to fetch subscriptions.' }); }
});

// GET active subscription for a company (used by usePlan hook)
// GET /api/subscriptions/active?adminId=123
router.get('/active', (req, res) => {
    try {
        const { adminId } = req.query;
        if (!adminId) return res.status(400).json({ error: 'adminId is required.' });

        const data = readData();
        // Find the most recent active subscription for this company
        const sub = data
            .filter(s => String(s.adminId) === String(adminId) && s.status === 'active')
            .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))[0];

        if (!sub) return res.json({ planName: 'none', status: 'none' });
        res.json(sub);
    } catch { res.status(500).json({ error: 'Failed to fetch active subscription.' }); }
});

// POST create subscription (called after payment verification)
router.post('/', (req, res) => {
    try {
        const { adminId, companyName, planId, planName, price, billingCycle, status, paymentId, orderId, paidAt } = req.body;
        const data = readData();
        const sub  = {
            id:           Date.now(),
            adminId:      adminId      || null,
            companyName:  companyName  || 'Unknown',
            planId:       planId       || null,
            planName:     planName     || 'Unknown',
            price:        Number(price) || 0,
            billingCycle: billingCycle || 'monthly',
            status:       status       || 'active',
            paymentId:    paymentId    || null,
            orderId:      orderId      || null,
            paidAt:       paidAt       || new Date().toISOString()
        };
        data.unshift(sub);
        writeData(data);
        res.status(201).json(sub);
    } catch { res.status(500).json({ error: 'Failed to save subscription.' }); }
});

module.exports = router;
