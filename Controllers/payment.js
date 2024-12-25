import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import crypto from "crypto";  // Change this line
import dotenv from 'dotenv'


dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  try {
    var options = {
      amount: amount * 100,  // Razorpay expects the amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Error creating order." });
    }

    res.json({
      orderId: order.id,
      amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Failed to create Razorpay order." });
  }
};

// Verify payment / Save to DB
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  try {
    // Verify payment signature using Razorpay's signature verification method
    const hmac = crypto.createHmac("sha256", razorpay.key_secret);
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Payment signature mismatch" });
    }

    // If signature is valid, save payment details to the database
    const orderConfirm = await Payment.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      payStatus: "paid",
    });

    res.json({ message: "Payment successful", success: true, orderConfirm });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

//user specific order
export const userOrder = async(req,res)=>{
  let userId = req.user
  let orders = await Payment.find({userId:userId}).sort({paymentDate:-1});
  res.json(orders)
}

//user specific allorders
export const allOrders = async(req,res)=>{
  
  let orders = await Payment.find().sort({paymentDate:-1});
  res.json(orders)
}
