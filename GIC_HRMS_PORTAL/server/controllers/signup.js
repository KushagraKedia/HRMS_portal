// controllers/signup.js
const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

function readUsers()    { if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]'); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeUsers(d)  { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

const signUpAdmin = (req, res) => {
    try {
        const { name, email, password, companyName } = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim())
            return res.status(400).json({ error: 'Name, email and password are required.' });

        const users = readUsers();

        // Each email must be unique across all users
        if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase()))
            return res.status(409).json({ error: 'Email already registered.' });

        // One admin per company is fine — multiple admins allowed (different companies)
        const adminId = Date.now();

        const admin = {
            id:          adminId,
            adminId:     adminId,      // admin's own id is their company id
            name:        name.trim(),
            email:       email.trim().toLowerCase(),
            password,                  // hash in production
            role:        'admin',
            companyName: companyName?.trim() || name.trim(),
            createdAt:   new Date().toISOString()
        };

        users.push(admin);
        writeUsers(users);

        const { password: _, ...safeAdmin } = admin;
        res.status(201).json({ message: 'Admin account created.', user: safeAdmin });
    } catch (err) {
        res.status(500).json({ error: 'Signup failed.' });
    }
};

module.exports = { signUpAdmin };
