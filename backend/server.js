import express from "express"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import connectDB from "./db/index.js"
import cors from 'cors'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(cors())

//routes
import urlRoute from './routes/url.route.js'


app.use('/url', urlRoute)

connectDB()
.then(() => {
    app.listen(PORT, function(){
        console.log(`App is running on port ${PORT}`)
    })
})
.catch(() => {
    console.log("server failed !!!")
})