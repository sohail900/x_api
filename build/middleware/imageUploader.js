"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = __importStar(require("cloudinary"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        return {
            folder: 'xUserProfile',
            allowedFormats: ['jpg', 'png', 'jpeg'],
        };
    },
});
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
const upload = (0, multer_1.default)({
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
});
exports.default = upload;
//# sourceMappingURL=imageUploader.js.map