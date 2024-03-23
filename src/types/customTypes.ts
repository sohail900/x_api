import { Request } from 'express'
import { Document } from 'mongoose'
interface UserTypes extends Document {
    comparePassword: (password: string) => Promise<boolean>
    generateToken: () => Promise<string>
}
interface AuthenticatedRequest extends Request {
    user?: any
}
export { UserTypes, AuthenticatedRequest }
