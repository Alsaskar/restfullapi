import express, {Application, Request, Response} from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config() // config env

// Routes
import AuthRoute from './routes/AuthRoute'
import UserRote from './routes/UserRoute'
import NoteRoute from './routes/NoteRoute'

class App{
    public app: Application
    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void{
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(bodyParser.json())
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }

    protected routes(): void{
        this.app.use('/auth', AuthRoute)
        this.app.use('/user', UserRote)
        this.app.use('/note', NoteRoute)
    }
}

const app = new App().app;
app.listen(process.env.PORT)