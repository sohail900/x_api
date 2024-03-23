import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ErrorHandler } from '../middleware/error/errorHandler'
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        password: { type: String, required: true, minLength: 8 },
        imagePath: { type: String, required: true },
    },
    { timestamps: true }
)
//generate jwt tokens
userSchema.methods.generateToken = async function () {
    try {
        const tokens = jwt.sign(
            { _id: this._id },
            process.env.JWT_SECRET as string
        )
        return tokens
    } catch (error) {
        throw new ErrorHandler(500, 'Error generating token')
    }
}
//Verify Password.
type Password = string
userSchema.methods.comparePassword = async function (password: Password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        new ErrorHandler(402, 'Error verifying password')
    }
}
///USING HASH ALGO TO ENCRYPT PASSWORD
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next() //check password if field modified or not
    //if password is modified
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (error: any) {
        throw new ErrorHandler(500, error)
    }
})

export const UserModel = mongoose.model('userinfo', userSchema)
