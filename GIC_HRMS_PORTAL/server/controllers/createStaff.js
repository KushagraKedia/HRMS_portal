// controllers/createStaff.js
const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

function readUsers()   { if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]'); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeUsers(d) { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

const createStaffAccount = (req, res) => {
    try {
        const { name, email, password } = req.body;
        const admin = req.user; // set by protect middleware

        if (!name?.trim() || !email?.trim() || !password?.trim())
            return res.status(400).json({ error: 'Name, email and password are required.' });

        if (password.length < 6)
            return res.status(400).json({ error: 'Password must be at least 6 characters.' });

        const users = readUsers();

        if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase()))
            return res.status(409).json({ error: 'Email already registered.' });

        const staff = {
            id:          Date.now(),
            adminId:     admin.adminId,       // links staff to their company/admin
            name:        name.trim(),
            email:       email.trim().toLowerCase(),
            password,
            role:        'staff',
            companyName: admin.companyName,
            createdAt:   new Date().toISOString()
        };

        users.push(staff);
        writeUsers(users);

        const { password: _, ...safeStaff } = staff;
        res.status(201).json({ message: 'Staff account created.', user: safeStaff });
    } catch {
        res.status(500).json({ error: 'Failed to create staff.' });
    }
};

// GET all staff belonging to the logged-in admin's company
const getStaff = (req, res) => {
    try {
        const admin = req.user;
        const users = readUsers();
        const staff = users
            .filter(u => u.role === 'staff' && u.adminId === admin.adminId)
            .map(({ password: _, ...u }) => u);
        res.json(staff);
    } catch {
        res.status(500).json({ error: 'Failed to fetch staff.' });
    }
};

// DELETE a staff member (admin only, must belong to same company)
const deleteStaff = (req, res) => {
    try {
        const admin = req.user;
        const users = readUsers();
        const index = users.findIndex(u => u.id === Number(req.params.id) && u.adminId === admin.adminId && u.role === 'staff');
        if (index === -1) return res.status(404).json({ error: 'Staff not found.' });
        users.splice(index, 1);
        writeUsers(users);
        res.json({ message: 'Staff deleted.' });
    } catch {
        res.status(500).json({ error: 'Failed to delete staff.' });
    }
};

module.exports = { createStaffAccount, getStaff, deleteStaff };
