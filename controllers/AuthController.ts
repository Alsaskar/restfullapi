import {Request, Response} from 'express'
import * as UserModel from '../models/UserModel'
import {User} from '../interface/User'

export async function register(req: Request, res: Response){
    const newUser: User = req.body

    UserModel.regisUser(newUser, (err: Error, result: any[]) => {
        if(err){
            return res.status(500).json({success: false})
        }

        res.status(200).json({result})
    })
}

export async function login(req: Request, res: Response){
    const user: User = req.body

    UserModel.loginUser(user, (err: Error, result: any[]) => {
        if(err) throw err

        res.status(200).json({result})
    })
}

export async function loggedIn(req: Request, res: Response){
    const email = res.locals.jwt.email
    
    UserModel.getData(email, (err: Error, result: any[]) => {
        if(err) throw err

        res.status(200).json({result})
    })
}