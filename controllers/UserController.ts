import {Request, Response} from 'express'
import * as UserModel from '../models/UserModel'
import {User} from '../interface/User'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/user')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        return cb(null, true);
   }else{
        return cb("Foto hanya bisa png atau jpg", false);
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 2},
    fileFilter: fileFilter
}).single('foto')

export async function updateFoto(req: Request, res: Response){
    upload(req, res, (err) => {
        if(err){
            if(err.code === 'LIMIT_FILE_SIZE'){ // jika limit size
                res.status(500).json({message: "Foto terlalu besar. Max 2MB", success: false})
            }else{
                res.status(500).json({message: err, success: false})
            }
        }else{ // jika tidak terjadi error
            const idUser = req.params.idUser
            const foto = req.file?.filename
    
            UserModel.updateFoto(idUser, foto, (err: Error, result: any[]) => {
                if(err) throw err

                res.status(200).json({result})
            })
        }
    })
}