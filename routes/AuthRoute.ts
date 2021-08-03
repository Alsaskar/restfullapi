import express from 'express';
import {register, login, loggedIn} from '../controllers/AuthController';
import CekToken from '../middleware/CekToken';
const router: express.Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logged-in', CekToken, loggedIn);

export default router;