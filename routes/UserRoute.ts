import express from 'express';
import {updateFoto} from '../controllers/UserController';
const router: express.Router = express.Router();

router.put('/update-foto/:idUser', updateFoto);

export default router;