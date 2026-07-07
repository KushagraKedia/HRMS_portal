// controllers/login.js
const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

function readUsers() { if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]'); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }

const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim())
            return res.status(400).json({ error: 'Email and password are required.' });

        const users = readUsers();
        const user  = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

        if (!user)
            return res.status(401).json({ error: 'No account found with this email.' });

        if (user.password !== password)
            return res.status(401).json({ error: 'Incorrect password.' });

        const { password: _, ...safeUser } = user;
        res.json({ message: 'Login successful.', user: safeUser });
    } catch {
        res.status(500).json({ error: 'Login failed.' });
    }
};

module.exports = { loginUser };
