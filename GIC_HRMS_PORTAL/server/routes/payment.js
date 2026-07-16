const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay with your Test or Live keys from Razorpay Dashboard
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Key ID
  key_secret: "YOUR_RAZORPAY_KEY_SECRET", // Replace with your actual Key Secret
});

// Route: http://localhost:5000/api/payments/order
router.post("/order", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const options = {
      amount: Math.round(amount * 100), // Convert INR to Paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Route: http://localhost:5000/api/payments/verify
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "YOUR_RAZORPAY_KEY_SECRET") // Replace with actual Key Secret
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment is verified! Perform database updates here
      res.status(200).json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Signature verification error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;