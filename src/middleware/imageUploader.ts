import * as cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        return {
            folder: 'xUserProfile',
            allowedFormats: ['jpg', 'png', 'jpeg'],
        }
    },
})
//# if using local storage, uncomment below

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'upload')
//     },
//     filename(req, file, cb) {
//         ;``
//         cb(null, Date.now() + file.originalname)
//     },
// })
const upload = multer({
    storage: storage,
    //TODO: custom file filter for images (ONLY FOR LOCAL STORAGE)
    // fileFilter(req, file, cb) {
    //     if (
    //         file.mimetype === 'image/jpg' ||
    //         file.mimetype === 'image/png' ||
    //         file.mimetype === 'image/jpeg'
    //     ) {
    //         cb(null, true)
    //     } else {
    //         cb(null, false)
    //     }
    // },
})
export default upload
