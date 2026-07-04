// accountsRoutes.js
// Mount in server.js as: app.use('/api/accounts', require('./routes/accountsRoutes'));

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router    = express.Router();
const DATA_FILE = path.join(__dirname, '../data/accounts.json');

function readData()    { if (!fs.existsSync(DATA_FILE)) { fs.writeFileSync(DATA_FILE, '[]'); } return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeData(d)  { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

// GET all
router.get('/', (req, res) => {
    try { res.json(readData()); } catch { res.status(500).json({ error: 'Failed to read accounts.' }); }
});

// POST create
router.post('/', (req, res) => {
    try {
        const { company, email, phone, location, industry, website, source } = req.body;
        if (!company?.trim()) return res.status(400).json({ error: 'Company name is required.' });
        const data = readData();
        if (data.some(a => a.company?.toLowerCase() === company.trim().toLowerCase())) return res.status(409).json({ error: 'Account already exists.' });
        const account = { id: Date.now(), company: company.trim(), email: email||'', phone: phone||'', location: location||'', industry: industry||'', website: website||'', source: source||'manual', createdAt: new Date().toISOString() };
        data.unshift(account);
        writeData(data);
        res.status(201).json(account);
    } catch { res.status(500).json({ error: 'Failed to create account.' }); }
});

// PATCH update
router.patch('/:id', (req, res) => {
    try {
        const data   = readData();
        const index  = data.findIndex(a => a.id === Number(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Account not found.' });
        data[index] = { ...data[index], ...req.body, id: data[index].id };
        writeData(data);
        res.json(data[index]);
    } catch { res.status(500).json({ error: 'Failed to update account.' }); }
});

// DELETE
router.delete('/:id', (req, res) => {
    try {
        const data = readData();
        const filtered = data.filter(a => a.id !== Number(req.params.id));
        if (filtered.length === data.length) return res.status(404).json({ error: 'Account not found.' });
        writeData(filtered);
        res.json({ message: 'Account deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete account.' }); }
});

module.exports = router;
