import express from 'express';
import { users , login, register, profile } from '../Controllers/user.js';
import {Authenticated} from '../Middlewares/auth.js';


const router = express.Router();

// Register User Route
router.post('/register', register); // => /api/user/register

//Login User
router.post('/login',login);

//get all users
router.get('/all',users);

//get user profile
router.get('/profile',Authenticated ,profile)


export default router;
