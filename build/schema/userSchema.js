"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorHandler_1 = require("../middleware/error/errorHandler");
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    imagePath: { type: String, required: true },
}, { timestamps: true });
//generate jwt tokens
userSchema.methods.generateToken = async function () {
    try {
        const tokens = jsonwebtoken_1.default.sign({ _id: this._id }, process.env.JWT_SECRET);
        return tokens;
    }
    catch (error) {
        throw new errorHandler_1.ErrorHandler(500, 'Error generating token');
    }
};
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt_1.default.compare(password, this.password);
    }
    catch (error) {
        new errorHandler_1.ErrorHandler(402, 'Error verifying password');
    }
};
///USING HASH ALGO TO ENCRYPT PASSWORD
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next(); //check password if field modified or not
    //if password is modified
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
        return next();
    }
    catch (error) {
        throw new errorHandler_1.ErrorHandler(500, error);
    }
});
exports.UserModel = mongoose_1.default.model('userinfo', userSchema);
//# sourceMappingURL=userSchema.js.map