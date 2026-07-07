// leadsRoutes.js
// Place this file in your backend's routes/ folder.
// In your server.js, mount it like:
//   const leadsRoutes = require('./routes/leadsRoutes');
//   app.use('/api/leads', leadsRoutes);

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Path to the JSON file — put leads.json in the same folder as this file,
// or adjust the path to wherever you store it.
const DATA_FILE = path.join(__dirname, '../data/leads.json');

// ─── Helper: read JSON file ───────────────────────────────────────────────────
function readData() {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
}

// ─── Helper: write JSON file ──────────────────────────────────────────────────
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Helper: recalculate count ────────────────────────────────────────────────
function recalcCount(column) {
    column.count = column.leads.length;
    return column;
}


// ════════════════════════════════════════════════════════════════════════════════
//  COLUMN (TAB) ROUTES
// ════════════════════════════════════════════════════════════════════════════════

// GET /api/leads/columns
// Admin: all leads filtered by adminId. Staff: only their assigned leads.
router.get("/columns", (req, res) => {
    try {
        const { adminId, assignedTo } = req.query;
        let data = readData();

        // Filter leads by adminId (company) if provided
        if (adminId) {
            data = data.map(col => {
                const filtered = col.leads.filter(l => String(l.adminId) === String(adminId));
                return { ...col, leads: filtered, count: filtered.length };
            });
        }

        // If assignedTo provided (staff view), filter further
        if (assignedTo) {
            data = data.map(col => {
                const filtered = col.leads.filter(l => l.assignedTo === assignedTo);
                return { ...col, leads: filtered, count: filtered.length };
            });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read leads data.' });
    }
});


// POST /api/leads/columns
// Creates a new column (tab).
// Body: { status, color }
// Example: { "status": "In Progress", "color": "#1AA3E8" }
router.post('/columns', (req, res) => {
    try {
        const { status, color } = req.body;

        if (!status || !status.trim()) {
            return res.status(400).json({ error: 'Column status (name) is required.' });
        }

        const data = readData();

        // Prevent duplicate column names
        const exists = data.some(col => col.status.toLowerCase() === status.trim().toLowerCase());
        if (exists) {
            return res.status(409).json({ error: `A column named "${status}" already exists.` });
        }

        const newColumn = {
            status: status.trim(),
            color: color || '#1AA3E8',   // default blue if no color given
            count: 0,
            total: '$0',
            leads: []
        };

        data.push(newColumn);
        writeData(data);

        res.status(201).json({ message: 'Column created.', column: newColumn });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create column.' });
    }
});


// DELETE /api/leads/columns/:status
// Deletes a column and ALL its leads.
// Example: DELETE /api/leads/columns/Lost
router.delete('/columns/:status', (req, res) => {
    try {
        const targetStatus = decodeURIComponent(req.params.status);
        let data = readData();

        const index = data.findIndex(col => col.status === targetStatus);
        if (index === -1) {
            return res.status(404).json({ error: `Column "${targetStatus}" not found.` });
        }

        data.splice(index, 1);
        writeData(data);

        res.json({ message: `Column "${targetStatus}" deleted.` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete column.' });
    }
});


// ════════════════════════════════════════════════════════════════════════════════
//  LEAD ROUTES
// ════════════════════════════════════════════════════════════════════════════════

// POST /api/leads/columns/:status/leads
router.post('/columns/:status/leads', (req, res) => {
    try {
        const targetStatus = decodeURIComponent(req.params.status);
        const { name, email, value, phone, location, iconBg, assignedTo, adminId, createdBy } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }

        const data   = readData();
        const column = data.find(col => col.status === targetStatus);

        if (!column) {
            return res.status(404).json({ error: `Column "${targetStatus}" not found.` });
        }

        const initials = name.trim().split(' ').map(w => w[0].toUpperCase()).slice(0, 2).join('');

        const newLead = {
            initials,
            name:       name.trim(),
            value:      value || '$0',
            email:      email.trim(),
            phone:      phone || 'N/A',
            location:   location || 'N/A',
            iconBg:     iconBg || '#1AA3E8',
            assignedTo: assignedTo || '',
            adminId:    adminId || null,
            createdBy:  createdBy || '',
            createdAt:  new Date().toISOString()
        };

        column.leads.push(newLead);
        recalcCount(column);
        writeData(data);

        res.status(201).json({ message: 'Lead added.', lead: newLead });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add lead.' });
    }
});


// DELETE /api/leads/columns/:status/leads/:email
// Deletes a specific lead (identified by email) from a column.
// Example: DELETE /api/leads/columns/Contacted/leads/linda@gmail.com
router.delete('/columns/:status/leads/:email', (req, res) => {
    try {
        const targetStatus = decodeURIComponent(req.params.status);
        const targetEmail = decodeURIComponent(req.params.email);

        const data = readData();
        const column = data.find(col => col.status === targetStatus);

        if (!column) {
            return res.status(404).json({ error: `Column "${targetStatus}" not found.` });
        }

        const leadIndex = column.leads.findIndex(l => l.email === targetEmail);
        if (leadIndex === -1) {
            return res.status(404).json({ error: `Lead with email "${targetEmail}" not found.` });
        }

        column.leads.splice(leadIndex, 1);
        recalcCount(column);
        writeData(data);

        res.json({ message: `Lead "${targetEmail}" deleted from "${targetStatus}".` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete lead.' });
    }
});


// PATCH /api/leads/columns/:status
// Edits a column's name and/or color.
// Body: { status, color }
router.patch('/columns/:status', (req, res) => {
    try {
        const targetStatus = decodeURIComponent(req.params.status);
        const { status: newStatus, color } = req.body;

        const data = readData();
        const column = data.find(col => col.status === targetStatus);
        if (!column) return res.status(404).json({ error: `Column "${targetStatus}" not found.` });

        // Check for duplicate name (only if name is actually changing)
        if (newStatus && newStatus.trim() !== targetStatus) {
            const duplicate = data.some(col => col.status.toLowerCase() === newStatus.trim().toLowerCase());
            if (duplicate) return res.status(409).json({ error: `A column named "${newStatus}" already exists.` });
            column.status = newStatus.trim();
        }

        if (color) column.color = color;

        writeData(data);
        res.json({ message: 'Column updated.', column });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update column.' });
    }
});


// PATCH /api/leads/move
// Moves a lead from one column to another (for drag-and-drop persistence).
// Body: { email, fromStatus, toStatus }
router.patch('/move', (req, res) => {
    try {
        const { email, fromStatus, toStatus } = req.body;

        if (!email || !fromStatus || !toStatus) {
            return res.status(400).json({ error: 'email, fromStatus, and toStatus are required.' });
        }

        const data = readData();
        const fromCol = data.find(col => col.status === fromStatus);
        const toCol   = data.find(col => col.status === toStatus);

        if (!fromCol) return res.status(404).json({ error: `Source column "${fromStatus}" not found.` });
        if (!toCol)   return res.status(404).json({ error: `Target column "${toStatus}" not found.` });

        const leadIndex = fromCol.leads.findIndex(l => l.email === email);
        if (leadIndex === -1) {
            return res.status(404).json({ error: `Lead "${email}" not found in "${fromStatus}".` });
        }

        const [lead] = fromCol.leads.splice(leadIndex, 1);
        toCol.leads.push(lead);

        recalcCount(fromCol);
        recalcCount(toCol);
        writeData(data);

        res.json({ message: `Lead moved from "${fromStatus}" to "${toStatus}".`, lead });
    } catch (err) {
        res.status(500).json({ error: 'Failed to move lead.' });
    }
});


// PATCH /api/leads/columns/:status/leads/:email
// Updates a specific lead's details.
// Body: { name, value, phone, location } — email is the identifier so can't be changed here
router.patch('/columns/:status/leads/:email', (req, res) => {
    try {
        const targetStatus = decodeURIComponent(req.params.status);
        const targetEmail  = decodeURIComponent(req.params.email);
        const { name, value, phone, location } = req.body;

        const data   = readData();
        const column = data.find(col => col.status === targetStatus);

        if (!column) return res.status(404).json({ error: `Column "${targetStatus}" not found.` });

        const lead = column.leads.find(l => l.email === targetEmail);
        if (!lead) return res.status(404).json({ error: `Lead "${targetEmail}" not found.` });

        // Only update fields that were sent
        if (name)     { lead.name     = name.trim(); lead.initials = name.trim().split(' ').map(w => w[0].toUpperCase()).slice(0, 2).join(''); }
        if (value)    lead.value    = value.trim();
        if (phone)    lead.phone    = phone.trim();
        if (location) lead.location = location.trim();

        writeData(data);
        res.json({ message: 'Lead updated.', lead });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update lead.' });
    }
});


// ════════════════════════════════════════════════════════════════════════════════
//  NOTES ROUTES  —  /api/leads/lead/:email/notes
// ════════════════════════════════════════════════════════════════════════════════

function getLeadByEmail(data, email) {
    for (const col of data) {
        const lead = col.leads.find(l => l.email === email);
        if (lead) return lead;
    }
    return null;
}

// GET all notes for a lead
router.get('/lead/:email/notes', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.notes || []);
    } catch { res.status(500).json({ error: 'Failed to fetch notes.' }); }
});

// POST add a note
router.post('/lead/:email/notes', (req, res) => {
    try {
        const { text } = req.body;
        if (!text?.trim()) return res.status(400).json({ error: 'Note text is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.notes) lead.notes = [];
        const note = { id: Date.now(), text: text.trim(), createdAt: new Date().toISOString() };
        lead.notes.unshift(note);
        writeData(data);
        res.status(201).json(note);
    } catch { res.status(500).json({ error: 'Failed to add note.' }); }
});

// PATCH edit a note
router.patch('/lead/:email/notes/:noteId', (req, res) => {
    try {
        const { text } = req.body;
        if (!text?.trim()) return res.status(400).json({ error: 'Note text is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        const note = (lead.notes || []).find(n => n.id === Number(req.params.noteId));
        if (!note) return res.status(404).json({ error: 'Note not found.' });
        note.text = text.trim();
        note.updatedAt = new Date().toISOString();
        writeData(data);
        res.json(note);
    } catch { res.status(500).json({ error: 'Failed to edit note.' }); }
});

// DELETE a note
router.delete('/lead/:email/notes/:noteId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.notes = (lead.notes || []).filter(n => n.id !== Number(req.params.noteId));
        writeData(data);
        res.json({ message: 'Note deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete note.' }); }
});


// ════════════════════════════════════════════════════════════════════════════════
//  CALLS ROUTES  —  /api/leads/lead/:email/calls
// ════════════════════════════════════════════════════════════════════════════════

// GET all calls
router.get('/lead/:email/calls', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.calls || []);
    } catch { res.status(500).json({ error: 'Failed to fetch calls.' }); }
});

// POST log a call
router.post('/lead/:email/calls', (req, res) => {
    try {
        const { note, status } = req.body;
        if (!note?.trim()) return res.status(400).json({ error: 'Call note is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.calls) lead.calls = [];
        const call = { id: Date.now(), note: note.trim(), status: status || 'Answered', loggedAt: new Date().toISOString() };
        lead.calls.unshift(call);
        writeData(data);
        res.status(201).json(call);
    } catch { res.status(500).json({ error: 'Failed to log call.' }); }
});

// PATCH update call status
router.patch('/lead/:email/calls/:callId', (req, res) => {
    try {
        const { status } = req.body;
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        const call = (lead.calls || []).find(c => c.id === Number(req.params.callId));
        if (!call) return res.status(404).json({ error: 'Call not found.' });
        if (status) call.status = status;
        writeData(data);
        res.json(call);
    } catch { res.status(500).json({ error: 'Failed to update call.' }); }
});

// DELETE a call
router.delete('/lead/:email/calls/:callId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.calls = (lead.calls || []).filter(c => c.id !== Number(req.params.callId));
        writeData(data);
        res.json({ message: 'Call deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete call.' }); }
});


// ════════════════════════════════════════════════════════════════════════════════
//  FILES ROUTES  —  /api/leads/lead/:email/files
// ════════════════════════════════════════════════════════════════════════════════

// GET all files
router.get('/lead/:email/files', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.files || []);
    } catch { res.status(500).json({ error: 'Failed to fetch files.' }); }
});

// POST add a file record
router.post('/lead/:email/files', (req, res) => {
    try {
        const { title, description, type, owner } = req.body;
        if (!title?.trim()) return res.status(400).json({ error: 'File title is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.files) lead.files = [];
        const file = { id: Date.now(), title: title.trim(), description: description || '', type: type || 'Proposal', owner: owner || 'Unknown', status: 'Proposal', createdAt: new Date().toISOString() };
        lead.files.unshift(file);
        writeData(data);
        res.status(201).json(file);
    } catch { res.status(500).json({ error: 'Failed to add file.' }); }
});

// DELETE a file
router.delete('/lead/:email/files/:fileId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.files = (lead.files || []).filter(f => f.id !== Number(req.params.fileId));
        writeData(data);
        res.json({ message: 'File deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete file.' }); }
});


module.exports = router;

// GET all notes for a lead
router.get('/:email/notes', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.notes || []);
    } catch { res.status(500).json({ error: 'Failed to fetch notes.' }); }
});

// POST add a note
router.post('/:email/notes', (req, res) => {
    try {
        const { text } = req.body;
        if (!text?.trim()) return res.status(400).json({ error: 'Note text is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.notes) lead.notes = [];
        const note = { id: Date.now(), text: text.trim(), createdAt: new Date().toISOString() };
        lead.notes.unshift(note);
        writeData(data);
        res.status(201).json(note);
    } catch { res.status(500).json({ error: 'Failed to add note.' }); }
});

// PATCH edit a note
router.patch('/:email/notes/:noteId', (req, res) => {
    try {
        const { text } = req.body;
        if (!text?.trim()) return res.status(400).json({ error: 'Note text is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        const note = (lead.notes || []).find(n => n.id === Number(req.params.noteId));
        if (!note) return res.status(404).json({ error: 'Note not found.' });
        note.text = text.trim();
        note.updatedAt = new Date().toISOString();
        writeData(data);
        res.json(note);
    } catch { res.status(500).json({ error: 'Failed to edit note.' }); }
});

// DELETE a note
router.delete('/:email/notes/:noteId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.notes = (lead.notes || []).filter(n => n.id !== Number(req.params.noteId));
        writeData(data);
        res.json({ message: 'Note deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete note.' }); }
});


// ════════════════════════════════════════════════════════════════════════════════
//  CALLS ROUTES  —  /api/leads/:email/calls
// ════════════════════════════════════════════════════════════════════════════════

// GET all calls
router.get('/:email/calls', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.calls || []);
    } catch { res.status(500).json({ error: 'Failed to fetch calls.' }); }
});

// POST log a call
router.post('/:email/calls', (req, res) => {
    try {
        const { note, status } = req.body;
        if (!note?.trim()) return res.status(400).json({ error: 'Call note is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.calls) lead.calls = [];
        const call = { id: Date.now(), note: note.trim(), status: status || 'Answered', loggedAt: new Date().toISOString() };
        lead.calls.unshift(call);
        writeData(data);
        res.status(201).json(call);
    } catch { res.status(500).json({ error: 'Failed to log call.' }); }
});

// PATCH update call status
router.patch('/:email/calls/:callId', (req, res) => {
    try {
        const { status } = req.body;
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        const call = (lead.calls || []).find(c => c.id === Number(req.params.callId));
        if (!call) return res.status(404).json({ error: 'Call not found.' });
        if (status) call.status = status;
        writeData(data);
        res.json(call);
    } catch { res.status(500).json({ error: 'Failed to update call.' }); }
});

// DELETE a call
router.delete('/:email/calls/:callId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.calls = (lead.calls || []).filter(c => c.id !== Number(req.params.callId));
        writeData(data);
        res.json({ message: 'Call deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete call.' }); }
});


// ════════════════════════════════════════════════════════════════════════════════
//  FILES ROUTES  —  /api/leads/:email/files
// ════════════════════════════════════════════════════════════════════════════════

// GET all files
router.get('/:email/files', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.files || []);
    } catch { res.status(500).json({ error: 'Failed to fetch files.' }); }
});

// POST add a file record (metadata only — no actual upload)
router.post('/:email/files', (req, res) => {
    try {
        const { title, description, type, owner } = req.body;
        if (!title?.trim()) return res.status(400).json({ error: 'File title is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.files) lead.files = [];
        const file = { id: Date.now(), title: title.trim(), description: description || '', type: type || 'Proposal', owner: owner || 'Unknown', status: 'Proposal', createdAt: new Date().toISOString() };
        lead.files.unshift(file);
        writeData(data);
        res.status(201).json(file);
    } catch { res.status(500).json({ error: 'Failed to add file.' }); }
});

// DELETE a file
router.delete('/:email/files/:fileId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.files = (lead.files || []).filter(f => f.id !== Number(req.params.fileId));
        writeData(data);
        res.json({ message: 'File deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete file.' }); }
});


module.exports = router;

// ════════════════════════════════════════════════════════════════════════════════
//  FOLLOW-UPS ROUTES  —  /api/leads/lead/:email/followups
// ════════════════════════════════════════════════════════════════════════════════

// GET all follow-ups
router.get('/lead/:email/followups', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        res.json(lead.followUps || []);
    } catch { res.status(500).json({ error: 'Failed to fetch follow-ups.' }); }
});

// POST add a follow-up
router.post('/lead/:email/followups', (req, res) => {
    try {
        const { date, time, note, priority } = req.body;
        if (!date) return res.status(400).json({ error: 'Date is required.' });
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        if (!lead.followUps) lead.followUps = [];
        const followUp = { id: Date.now(), date, time: time || '', note: note || '', priority: priority || 'Medium', createdAt: new Date().toISOString() };
        lead.followUps.push(followUp);
        writeData(data);
        res.status(201).json(followUp);
    } catch { res.status(500).json({ error: 'Failed to add follow-up.' }); }
});

// DELETE a follow-up
router.delete('/lead/:email/followups/:followUpId', (req, res) => {
    try {
        const data = readData();
        const lead = getLeadByEmail(data, decodeURIComponent(req.params.email));
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        lead.followUps = (lead.followUps || []).filter(f => f.id !== Number(req.params.followUpId));
        writeData(data);
        res.json({ message: 'Follow-up deleted.' });
    } catch { res.status(500).json({ error: 'Failed to delete follow-up.' }); }
});
