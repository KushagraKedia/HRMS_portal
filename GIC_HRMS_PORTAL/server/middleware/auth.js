// middleware/auth.js
const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');
function readUsers() { if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]'); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }

// Reads userId from request header and attaches user to req.user
// Frontend must send: headers: { 'x-user-id': user.id }
const protect = (req, res, next) => {
    try {
        const userId = req.headers['x-user-id'];
        if (!userId) return res.status(401).json({ error: 'Not authenticated. Please login.' });

        const users = readUsers();
        const user  = users.find(u => u.id === Number(userId));
        if (!user)  return res.status(401).json({ error: 'User not found.' });

        const { password: _, ...safeUser } = user;
        req.user = safeUser;
        next();
    } catch {
        res.status(500).json({ error: 'Auth check failed.' });
    }
};

// Only allows admins through
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Admin access required.' });
    next();
};

module.exports = { protect, isAdmin };
