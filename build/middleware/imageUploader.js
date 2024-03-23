"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary.v2,
//     params: async (req, file) => {
//         return {
//             folder: 'xUserProfile',
//             allowedFormats: ['jpg', 'png', 'jpeg'],
//         }
//     },
// })
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
exports.default = upload;
//# sourceMappingURL=imageUploader.js.map