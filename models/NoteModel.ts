import {db} from '../config/database'
import {Note} from '../interface/Note'
import { OkPacket, RowDataPacket } from 'mysql2'

export const create = (note: Note, callback: Function) => {
    const query = 'INSERT INTO notes(id_user, judul, label, content, tgl_create) VALUES (?, ?, ?, ?, ?)'

    db.query(query, [note.id_user, note.judul, note.label, note.content, note.tgl_create], (err, result) => {
        if(err) throw err;

        callback(null, {success: true})
    })
}

export const list = (idUser: string, callback: Function) => {
    const query = 'SELECT * FROM notes WHERE id_user = ?'

    db.query(query, idUser, (err, result) => {
        if(err) throw err;

        const cek = (<RowDataPacket> result).length;

        if (cek > 0) { // jika data tidak kosong
            callback(null, {result})
        }else{ // jika data kosong
            callback(null, {result: null})
        }
    })
}

export const update = (note: Note, idNote: string, callback: Function) => {
    const query = 'UPDATE notes SET judul = ?, label = ?, content = ? WHERE id = ?'

    db.query(query, [note.judul, note.label, note.content, idNote], (err, result) => {
        if(err) throw err;

        callback(null, {success: true, message: 'berhasil mengedit data'})
    })
}

export const remove = (idNote: string, callback: Function) => {
    const query = 'DELETE FROM notes WHERE id = ?'

    db.query(query, idNote, (err, result) => {
        if(err) throw err;

        callback(null, {success: true, message: 'berhasil menghapus data'})
    })
}

export const search = (keyword: string, callback: Function) => {
    const query = 'SELECT * FROM notes WHERE judul LIKE "%'+ keyword +'%" OR label LIKE "%'+ keyword +'%" '

    db.query(query, (err, result) => {
        if(err) throw err;

        const cek = (<RowDataPacket> result).length;

        if (cek > 0) { // jika data tidak kosong
            callback(null, {result, success: true})
        }else{ // jika data kosong
            callback(null, {message: 'Data yang dicari tidak ditemukan', success: false})
        }
    })
}