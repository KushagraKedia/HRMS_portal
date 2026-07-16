const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const subsFilePath = path.join(__dirname, '../data/subscriptions.json');

const readSubscriptions = () => JSON.parse(fs.readFileSync(subsFilePath, 'utf8') || '[]');
const writeSubscriptions = (data) => fs.writeFileSync(subsFilePath, JSON.stringify(data, null, 2));

// Get all active subscriptions (Superadmin view)
router.get('/', (req, res) => {
  try {
    const subs = readSubscriptions();
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
});

// Create/Update a subscription after a successful payment
router.post('/checkout-success', (req, res) => {
  try {
    const { companyId, companyName, planId, planName, amountPaid, razorpayPaymentId } = req.body;
    
    const subs = readSubscriptions();
    
    const newSubscription = {
      id: 'sub_' + Date.now(),
      companyId,
      companyName,
      planId,
      planName,
      amountPaid,
      paymentId: razorpayPaymentId || 'dummy_pay_' + Math.random().toString(36).substr(2, 9),
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days
    };

    // Remove any previous active subscriptions for this company
    const updatedSubs = subs.filter(sub => sub.companyId !== companyId);
    updatedSubs.push(newSubscription);
    
    writeSubscriptions(updatedSubs);
    res.status(200).json({ message: "Subscription activated successfully!", subscription: newSubscription });
  } catch (error) {
    res.status(500).json({ message: "Error saving subscription details" });
  }
});

module.exports = router;