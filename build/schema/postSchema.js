"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        trim: true,
    },
    fullname: {
        type: String,
    },
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    post: {
        type: String,
    },
    likes: [],
}, {
    timestamps: true,
});
exports.PostModel = mongoose_1.default.model('userPost', postSchema);
//# sourceMappingURL=postSchema.js.map