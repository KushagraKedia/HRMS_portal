const express = require('express');
const cors = require('cors');
const leadsRoutes = require('./routes/leadsRoutes');

const app = express();
const PORT = 5000;

// ── Middleware ────────────────────────────────────────────────────────────────

// Allows your React app (localhost:5173) to talk to this server
app.use(cors());

// Lets Express read JSON request bodies (req.body)
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/leads', leadsRoutes);

// Health check — visit http://localhost:5000/ to confirm server is running
app.get('/', (req, res) => {
    res.json({ message: 'GIC FOLKS backend is running!' });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
