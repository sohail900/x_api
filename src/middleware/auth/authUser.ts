import { Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserModel } from '../../schema/userSchema'
import { ErrorHandler } from '../error/errorHandler'
import { AuthenticatedRequest } from '../../types/customTypes'
async function authorizeUser(
    req: AuthenticatedRequest,
    resp: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return next(new ErrorHandler(401, 'Unauthorized User'))
    }
    //if cookie exist then verify cookie
    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload
        const user = await UserModel.findById({ _id: decode._id })
        req.user = user
        next()
    } catch (error) {
        return next(new ErrorHandler(401, 'Unauthorized Access'))
    }
}
export default authorizeUser
