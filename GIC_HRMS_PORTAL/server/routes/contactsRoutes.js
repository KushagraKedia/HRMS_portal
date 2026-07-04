// contactsRoutes.js
// Mount in server.js as: app.use('/api/contacts', require('./routes/contactsRoutes'));

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router    = express.Router();
const DATA_FILE = path.join(__dirname, '../data/contacts.json');

function readData()   { if (!fs.existsSync(DATA_FILE)) { fs.writeFileSync(DATA_FILE, '[]'); } return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeData(d) { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

router.get('/', (req, res) => {
    try { res.json(readData()); } catch { res.status(500).json({ error: 'Failed to read contacts.' }); }
});

router.post('/', (req, res) => {
    try {
        const { name, email, phone, location, company, role, iconBg, source } = req.body;
        if (!name?.trim() || !email?.trim()) return res.status(400).json({ error: 'Name and email are required.' });
        const data = readData();
        const initials = name.trim().split(' ').map(w => w[0]?.toUpperCase()).slice(0, 2).join('');
        const contact = { id: Date.now(), name: name.trim(), initials, email: email.trim(), phone: phone||'', location: location||'', company: company||'', role: role||'', iconBg: iconBg||'#1AA3E8', source: source||'manual', createdAt: new Date().toISOString() };
        data.unshift(contact);
        writeData(data);
        res.status(201).json(contact);
    } catch { res.status(500).json({ error: 'Failed to create contact.' }); }
});

router.patch('/:id', (req, res) => {
    try {
        const data  = readData();
        const index = data.findIndex(c => c.id === Number(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Contact not found.' });
        if (req.body.name) req.body.initials = req.body.name.trim().split(' ').map(w => w[0]?.toUpperCase()).slice(0, 2).join('');
        data[index] = { ...data[index], ...req.body, id: data[index].id };
        writeData(data);
        res.json(data[index]);
    } catch { res.status(500).json({ error: 'Failed to update contact.' }); }
});

router.delete('/:id', (req, res) => {
    try {
        const data     = readData();
        const filtered = data.filter(c => c.id !== Number(req.params.id));
        if (filtered.length === data.length) return res.status(404).json({ error: 'Contact not found.' });
        writeData(filtered);
        res.json({ message: 'Contact deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete contact.' }); }
});

module.exports = router;
