// routes/razorpayRoutes.js
// Mount in server.js: app.use('/api/razorpay', require('./routes/razorpayRoutes'));

const express  = require('express');
const crypto   = require('crypto');
const fs       = require('fs');
const path     = require('path');
const router   = express.Router();

const KEY_ID     = process.env.RAZORPAY_KEY_ID     || 'rzp_test_TFg4HbckCGy9UY';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 't20xaDU3b2xNtw1vgZcQUJr5';

const SUBS_FILE = path.join(__dirname, '../data/subscriptions.json');
function readSubs()   { if (!fs.existsSync(SUBS_FILE)) fs.writeFileSync(SUBS_FILE, '[]'); return JSON.parse(fs.readFileSync(SUBS_FILE, 'utf-8')); }
function writeSubs(d) { fs.writeFileSync(SUBS_FILE, JSON.stringify(d, null, 2)); }


// POST /api/razorpay/create-order
// Creates a Razorpay order and returns the order_id to the frontend
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency, planName, adminId, companyName } = req.body;

        if (!amount || !planName) return res.status(400).json({ error: 'Amount and planName are required.' });

        // Razorpay amount is in paise (1 INR = 100 paise)
        const amountInPaise = Math.round(Number(amount) * 100);

        const orderData = {
            amount:   amountInPaise,
            currency: currency || 'INR',
            receipt:  `receipt_${Date.now()}`,
            notes: {
                planName,
                adminId:     adminId     || '',
                companyName: companyName || '',
            }
        };

        // Call Razorpay API to create order
        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64')
            },
            body: JSON.stringify(orderData)
        });

        const order = await response.json();

        if (!response.ok) {
            console.error('Razorpay error:', order);
            return res.status(500).json({ error: order.error?.description || 'Failed to create order.' });
        }

        res.json({ orderId: order.id, amount: amountInPaise, currency: currency || 'INR', keyId: KEY_ID });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ error: 'Failed to create Razorpay order.' });
    }
});


// POST /api/razorpay/verify-payment
// Verifies payment signature and saves subscription
router.post('/verify-payment', (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planId, planName, price, billingCycle, adminId, companyName
        } = req.body;

        // Verify signature
        const body      = razorpay_order_id + '|' + razorpay_payment_id;
        const expected  = crypto.createHmac('sha256', KEY_SECRET).update(body).digest('hex');

        if (expected !== razorpay_signature) {
            return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' });
        }

        // Payment is verified — save subscription
        const subs = readSubs();
        const sub  = {
            id:           Date.now(),
            adminId:      adminId      || null,
            companyName:  companyName  || 'Unknown',
            planId:       planId       || null,
            planName:     planName     || 'Unknown',
            price:        Number(price) || 0,
            billingCycle: billingCycle || 'monthly',
            status:       'active',
            orderId:      razorpay_order_id,
            paymentId:    razorpay_payment_id,
            paidAt:       new Date().toISOString()
        };
        subs.unshift(sub);
        writeSubs(subs);

        res.json({ message: 'Payment verified and subscription activated.', subscription: sub });
    } catch (err) {
        console.error('Verify payment error:', err);
        res.status(500).json({ error: 'Payment verification failed.' });
    }
});


module.exports = router;
