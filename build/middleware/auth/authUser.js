"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../schema/userSchema");
const errorHandler_1 = require("../error/errorHandler");
async function authorizeUser(req, resp, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new errorHandler_1.ErrorHandler(401, 'Unauthorized User'));
    }
    //if cookie exist then verify cookie
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await userSchema_1.UserModel.findById({ _id: decode._id });
        req.user = user;
        next();
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler(401, 'Unauthorized Access'));
    }
}
exports.default = authorizeUser;
//# sourceMappingURL=authUser.js.map