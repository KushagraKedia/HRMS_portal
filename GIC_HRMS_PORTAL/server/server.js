const express               = require('express');
const cors                  = require('cors');
const leadsRoutes           = require('./routes/leadsRoutes');
const accountsRoutes        = require('./routes/accountsRoutes');
const contactsRoutes        = require('./routes/contactsRoutes');
const opportunitiesRoutes   = require('./routes/opportunitiesRoutes');
const authRoutes            = require('./routes/authRoutes');
const emailTemplatesRoutes  = require('./routes/emailTemplatesRoutes');

const plansRoutes           = require('./routes/plansRoutes');
const subscriptionsRoutes   = require('./routes/subscriptionsRoutes');
// 1. Import the new Payment route
const paymentRoutes         = require('./routes/payment'); 

const app  = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/leads',           leadsRoutes);
app.use('/api/accounts',        accountsRoutes);
app.use('/api/contacts',        contactsRoutes);
app.use('/api/opportunities',   opportunitiesRoutes);
app.use('/api/auth',            authRoutes);
app.use('/api/email-templates', emailTemplatesRoutes);

app.use('/api/plans',           plansRoutes);
app.use('/api/subscriptions',   subscriptionsRoutes);
// 2. Register the Payment route handler
app.use('/api/payments',        paymentRoutes); 

app.get('/', (req, res) => res.json({ message: 'GIC FOLKS backend is running!' }));

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));