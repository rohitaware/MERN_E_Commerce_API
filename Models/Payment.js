import mongoose from 'mongoose';

// Payment schema definition
const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  orderItems: Array,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming userId is an ObjectId
  userShipping: Object,
  payStatus: String,
  paymentDate: { type: Date, default: Date.now }
});

// Create the model
export const Payment = mongoose.model('Payment', paymentSchema);

