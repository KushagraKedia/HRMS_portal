// routes/authRoutes.js
const express = require('express');
const { signUpAdmin }                          = require('../controllers/signup');
const { loginUser }                            = require('../controllers/login');
const { createStaffAccount, getStaff, deleteStaff } = require('../controllers/createStaff');
const { protect, isAdmin }                     = require('../middleware/auth');

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────────────────
router.post('/signup', signUpAdmin);
router.post('/login',  loginUser);

// GET all companies (admin accounts) — for SuperAdmin dashboard
router.get('/companies', (req, res) => {
    const fs   = require('fs');
    const path = require('path');
    const DATA_FILE = path.join(__dirname, '../data/users.json');
    try {
        if (!fs.existsSync(DATA_FILE)) return res.json([]);
        const users     = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        const companies = users
            .filter(u => u.role === 'admin')
            .map(({ password: _, ...u }) => u);
        res.json(companies);
    } catch { res.status(500).json({ error: 'Failed to fetch companies.' }); }
});

// Check if any admin exists (used by SignUp page to lock/unlock form)
router.get('/check-admin', (req, res) => {
    const fs   = require('fs');
    const path = require('path');
    const DATA_FILE = path.join(__dirname, '../data/users.json');
    try {
        if (!fs.existsSync(DATA_FILE)) return res.json({ adminExists: false });
        const users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        res.json({ adminExists: users.some(u => u.role === 'admin') });
    } catch { res.status(500).json({ error: 'Check failed.' }); }
});

// ── Admin Protected ───────────────────────────────────────────────────────────
router.post('/create-staff',   protect, isAdmin, createStaffAccount);
router.get('/staff',           protect, isAdmin, getStaff);
router.delete('/staff/:id',    protect, isAdmin, deleteStaff);

module.exports = router;
