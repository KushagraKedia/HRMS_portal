const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   // <-- ADD THIS

// Load environment variables
require('dotenv').config();

// <-- ADD THIS WHOLE BLOCK
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

const leadsRoutes = require('./routes/leadsRoutes');
const accountsRoutes = require('./routes/accountsRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
const opportunitiesRoutes = require('./routes/opportunitiesRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/opportunities', opportunitiesRoutes);
app.use('/api/auth',          authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'GIC FOLKS backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});