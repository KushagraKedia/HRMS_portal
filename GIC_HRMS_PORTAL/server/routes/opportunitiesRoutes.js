// opportunitiesRoutes.js
// Mount in server.js as: app.use('/api/opportunities', require('./routes/opportunitiesRoutes'));

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router    = express.Router();
const DATA_FILE = path.join(__dirname, '../data/opportunities.json');

function readData()   { if (!fs.existsSync(DATA_FILE)) { fs.writeFileSync(DATA_FILE, '[]'); } return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeData(d) { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

router.get('/', (req, res) => {
    try { res.json(readData()); } catch { res.status(500).json({ error: 'Failed to read opportunities.' }); }
});

router.post('/', (req, res) => {
    try {
        const { name, company, amount, stage, closeDate, assignedTo, notes, source } = req.body;
        if (!name?.trim()) return res.status(400).json({ error: 'Opportunity name is required.' });
        const data = readData();
        const opp  = { id: Date.now(), name: name.trim(), company: company||'', amount: amount||'', stage: stage||'Prospecting', closeDate: closeDate||'', assignedTo: assignedTo||'', notes: notes||'', source: source||'manual', createdAt: new Date().toISOString() };
        data.unshift(opp);
        writeData(data);
        res.status(201).json(opp);
    } catch { res.status(500).json({ error: 'Failed to create opportunity.' }); }
});

router.patch('/:id', (req, res) => {
    try {
        const data  = readData();
        const index = data.findIndex(o => o.id === Number(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Opportunity not found.' });
        data[index] = { ...data[index], ...req.body, id: data[index].id };
        writeData(data);
        res.json(data[index]);
    } catch { res.status(500).json({ error: 'Failed to update opportunity.' }); }
});

router.delete('/:id', (req, res) => {
    try {
        const data     = readData();
        const filtered = data.filter(o => o.id !== Number(req.params.id));
        if (filtered.length === data.length) return res.status(404).json({ error: 'Opportunity not found.' });
        writeData(filtered);
        res.json({ message: 'Opportunity deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete opportunity.' }); }
});

module.exports = router;
