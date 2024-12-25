import express from 'express';
import { checkout, verify,userOrder,allOrders,} from '../Controllers/payment.js';
import { Authenticated } from '../Middlewares/auth.js';

const router = express.Router();

// Checkout route
router.post('/checkout', checkout);

// Verify & save to DB
router.post('/verify-payment', verify);

// User-specific order route
router.get('/userorder', Authenticated, userOrder);

//All Orders
router.get('/orders',  allOrders);

export default router;
