const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const plansFilePath = path.join(__dirname, '../data/plans.json');

// Helper functions to read/write JSON
const readPlans = () => JSON.parse(fs.readFileSync(plansFilePath, 'utf8') || '[]');
const writePlans = (data) => fs.writeFileSync(plansFilePath, JSON.stringify(data, null, 2));

// Get all plans
router.get('/', (req, res) => {
  try {
    const plans = readPlans();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans" });
  }
});

// Create a plan (Superadmin only)
router.post('/', (req, res) => {
  try {
    const plans = readPlans();
    const newPlan = {
      id: 'plan_' + Date.now(),
      name: req.body.name,
      price: Number(req.body.price),
      duration: req.body.duration || 'month',
      features: req.body.features || []
    };
    plans.push(newPlan);
    writePlans(plans);
    res.status(201).json({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Error creating plan" });
  }
});

// Delete a plan (Superadmin only)
router.delete('/:id', (req, res) => {
  try {
    let plans = readPlans();
    plans = plans.filter(p => p.id !== req.params.id);
    writePlans(plans);
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan" });
  }
});

module.exports = router;