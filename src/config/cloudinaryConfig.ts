import * as cloudinary from 'cloudinary'
///configure cloudinary give name,key,secret key
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECREATE,
})
