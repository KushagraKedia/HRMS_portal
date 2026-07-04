const express          = require('express');
const cors             = require('cors');
const leadsRoutes        = require('./routes/leadsRoutes');
const accountsRoutes     = require('./routes/accountsRoutes');
const contactsRoutes     = require('./routes/contactsRoutes');
const opportunitiesRoutes = require('./routes/opportunitiesRoutes');

const app  = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/leads',         leadsRoutes);
app.use('/api/accounts',      accountsRoutes);
app.use('/api/contacts',      contactsRoutes);
app.use('/api/opportunities', opportunitiesRoutes);

app.get('/', (req, res) => res.json({ message: 'GIC FOLKS backend is running!' }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
