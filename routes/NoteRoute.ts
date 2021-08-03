import express from 'express';
import {create, list, edit, remove, search} from '../controllers/NoteController';
const router: express.Router = express.Router();

router.post('/create', create);
router.get('/list/:idUser', list);
router.put('/edit/:idNote', edit);
router.delete('/delete/:idNote', remove);
router.get('/search/:keyword', search);

export default router;