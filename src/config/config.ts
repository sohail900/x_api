import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
mongoose
    .connect(`${process.env.ATLAS_URI}/xdatabase`)
    .then(() => console.log('connected to database'))
    .catch((e) => {
        console.log(e)
    })
