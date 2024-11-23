import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/url.models.js";
const router = express.Router()

//saving url into the db
router.post('/create', async(req, res)=>{
    const {originalUrl} = req.body
    const baseUrl = process.env.BASE_URL
    if(!originalUrl) return res.status(400).json({message: "Invalid url"})
    try {

        const shortId = nanoid(8)
        const shortUrl = `${baseUrl}/${shortId}`
        const url = new Url({originalUrl, shortId})


        const savedData = await url.save()
        console.log(savedData)
        res.status(200).json({originalUrl, shortUrl})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
})

//redirecting to original url
router.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId

    try {
       const url = await Url.findOne({shortId}) 
       if(!url) return res.json({error: "url not found"})

       res.status(200).redirect(url.originalUrl) 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router