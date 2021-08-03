import {Request, Response} from 'express'
import * as NoteModel from '../models/NoteModel'
import {Note} from '../interface/Note'

export async function create(req: Request, res: Response){
    const newNote: Note = req.body

    NoteModel.create(newNote, (err: Error, result: any[]) => {
        if(err){
            return res.status(500).json({success: false})
        }

        res.status(200).json({result})
    })
}

export async function list(req: Request, res: Response){
    const idUser = req.params.idUser;

    NoteModel.list(idUser, (err: Error, result: any[]) => {
        if(err){
            return res.status(500).json({success: false})
        }

        return res.status(200).json(result)
    })
}

export async function edit(req: Request, res: Response){
    const idNote = req.params.idNote;
    const newNote: Note = req.body

    NoteModel.update(newNote, idNote, (err: Error, result: any[]) => {
        if(err){
            return res.status(500).json({success: false})
        }

        return res.status(200).json(result)
    })
}

export async function remove(req: Request, res: Response){
    const idNote = req.params.idNote;

    NoteModel.remove(idNote, (err: Error, result: any[]) => {
        if(err){
            return res.status(500).json({success: false})
        }

        return res.status(200).json(result)
    })
}

export async function search(req: Request, res: Response){
    const keyword = req.params.keyword

    NoteModel.search(keyword, (err: Error, result: any[]) => {
        if(err){
            return res.status(500).json({success: false})
        }

        return res.status(200).json(result)
    })
}