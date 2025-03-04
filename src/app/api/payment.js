import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Store in .env file
    key_secret: process.env.RAZORPAY_SECRET, // Store in .env file
  });

  try {
    const options = {
      amount: req.body.amount * 100, // Convert to paise (INR)
      currency: "INR",
      receipt: `receipt_${Math.random().toString(36).substring(2)}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
