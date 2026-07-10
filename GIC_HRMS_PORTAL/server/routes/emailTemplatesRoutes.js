// emailTemplatesRoutes.js
// Mount in server.js: app.use('/api/email-templates', require('./routes/emailTemplatesRoutes'));

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router    = express.Router();
const DATA_FILE = path.join(__dirname, '../data/emailTemplates.json');

function readData()   { if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]'); return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
function writeData(d) { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

// GET all templates (filtered by adminId)
router.get('/', (req, res) => {
    try {
        const { adminId } = req.query;
        let data = readData();
        if (adminId) data = data.filter(t => String(t.adminId) === String(adminId));
        res.json(data);
    } catch { res.status(500).json({ error: 'Failed to fetch templates.' }); }
});

// GET single template by id
router.get('/:id', (req, res) => {
    try {
        const data     = readData();
        const template = data.find(t => t.id === Number(req.params.id));
        if (!template) return res.status(404).json({ error: 'Template not found.' });
        res.json(template);
    } catch { res.status(500).json({ error: 'Failed to fetch template.' }); }
});

// POST create template
router.post('/', (req, res) => {
    try {
        const { name, category, subject, body, adminId } = req.body;
        if (!name?.trim() || !subject?.trim() || !body?.trim())
            return res.status(400).json({ error: 'Name, subject and body are required.' });

        const data     = readData();
        const template = {
            id:        Date.now(),
            name:      name.trim(),
            category:  category || 'Follow Up',
            subject:   subject.trim(),
            body:      body.trim(),
            adminId:   adminId || null,
            createdAt: new Date().toISOString()
        };
        data.unshift(template);
        writeData(data);
        res.status(201).json(template);
    } catch { res.status(500).json({ error: 'Failed to create template.' }); }
});

// PATCH update template
router.patch('/:id', (req, res) => {
    try {
        const data  = readData();
        const index = data.findIndex(t => t.id === Number(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Template not found.' });
        data[index] = { ...data[index], ...req.body, id: data[index].id, updatedAt: new Date().toISOString() };
        writeData(data);
        res.json(data[index]);
    } catch { res.status(500).json({ error: 'Failed to update template.' }); }
});

// DELETE template
router.delete('/:id', (req, res) => {
    try {
        const data     = readData();
        const filtered = data.filter(t => t.id !== Number(req.params.id));
        if (filtered.length === data.length) return res.status(404).json({ error: 'Template not found.' });
        writeData(filtered);
        res.json({ message: 'Template deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete template.' }); }
});

module.exports = router;
