import {db} from '../config/database'
import {User} from '../interface/User'
import { OkPacket, RowDataPacket } from 'mysql2'
import dotenv from 'dotenv';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
dotenv.config(); // config env

// using for router register
export const regisUser = (user: User, callback: Function) => {
    // create hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt)

    const query2 = 'SELECT email FROM user WHERE email = ?'

    db.query(query2, user.email, (error, results) => {
        if(error) throw error;

        const cekEmail = (<RowDataPacket> results).length;

        if(cekEmail > 0){ // jika email telah digunakan
            callback(null, {msg: 'Email telah digunakan', success: false})
        }else{ // jika email belum digunakan
            const query = 'INSERT INTO user(nama, email, password) VALUES(?, ?, ?)'
            db.query(query, [user.nama, user.email, hash], (err, result) => {
                if(err) throw err;

                // daftarkan token
                const payload = { email: user.email }
                const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: '1day'});

                callback(null, {success: true, token: token})
            })
        }
    })

    
}

// using for login
export const loginUser = (user: User, callback: Function) => {
    const query = 'SELECT email, password FROM user WHERE email = ?'

    db.query(query, user.email, (err, result) => {
        if(err) throw err;

        const cekEmail = (<RowDataPacket> result).length;
        const row = (<RowDataPacket> result)[0];
        
        if(cekEmail > 0){ // jika email benar
            bcrypt.compare(user.password, row.password, (error: Error, response: Response) => {
                if(error) throw error;

                if(response){ // berhasil login

                    // daftarkan token
                    const payload = { email: row.email }
                    const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: '1day'});

                    const users = {
                        email: row.email,
                        token: token,
                        success: true
                    }

                    callback(null, users)
                }else{ // password salah
                    callback(null, {msg: 'Password salah', success: false})
                }
            })
        }else{ // jika email salah
            callback(null, {msg: 'Email salah', success: false})
        }
    })
}

export const getData = (email: string, callback: Function) => {
    const query = 'SELECT id, nama, email FROM user WHERE email = ?'

    db.query(query, email, (err, result) => {
        if(err) throw err;

        const row = (<RowDataPacket> result)[0];
        const user = {
            id: row.id,
            nama: row.nama,
            email: row.email
        }

        callback(null, user)
    })
}

export const updateFoto = (idUser: string, foto: any, callback: Function) => {
    const query = 'UPDATE user SET foto = ? WHERE id = ?'

    db.query(query, [foto, idUser], (err, result) => {
        if(err) throw err;

        callback(null, {success: true, message: 'berhasil mengedit foto profil'})
    })
}