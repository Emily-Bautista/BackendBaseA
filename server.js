const express = require('express')
const employeesRouter = require('./routes/MaxPayne')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.paths = {
            MaxPayne:"/api/MaxPayne"
        }
        this.middlewares()
        this.routes()
    }
    routes(){
        this.app.use(this.paths.MaxPayne, MaxPayneRouter)
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }
    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log("Backend corrriendo", process.env.PORT)
        })
    }
}
module.exports = Server