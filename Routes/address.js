import express from 'express';
import { addAddress, getAddress } from '../Controllers/address.js';
import { Authenticated } from '../Middlewares/auth.js';


const router = express.Router();

// Add Address Route
router.post('/add', Authenticated,addAddress);

//Get Address
router.get('/get',Authenticated,getAddress)

export default router;
