import { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../types/customTypes'
import { UserModel } from '../schema/userSchema'
import { PostModel } from '../schema/postSchema'
import { ErrorHandler } from '../middleware/error/errorHandler'
import { UserTypes } from '../types/customTypes'
import { resolveInclude } from 'ejs'

const getData = (
    req: AuthenticatedRequest,
    resp: Response,
    next: NextFunction
) => {
    const user = req.user
    resp.status(200).json({ someData: 'this is sohail here', user })
}
///Register Controller.
const registerUser = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body
        const imagePath = req.file?.path
        // Check if the user already exists with the provided email.
        const checkUser = await UserModel.findOne({ email })
        if (checkUser === null) {
            //<> if user not exist // add new user
            const user = new UserModel({
                name,
                username,
                email,
                password,
                imagePath,
            })
            //save user in our database
            const save = await user.save()
            return resp.status(201).json({
                success: true,
                message: 'successful add new user',
                userInfo: save,
            })
        }
        resp.status(409).json({
            success: false,
            message: 'User Already Exists',
        })
    } catch (error: any) {
        next(new ErrorHandler(500, error.message))
    }
}

///Login Controller.
const loginUser = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        // Verify User Credentials
        const registeredUser = (await UserModel.findOne({ email })) as UserTypes //NOTE: Type Casting
        //<> If User Not Found
        if (
            !registeredUser ||
            !(await registeredUser.comparePassword(password))
        ) {
            resp.status(401).json({
                success: false,
                message: 'Invalid Credentials',
            })
        }
        //TODO: Generate JWT tokens (....)
        const token = await registeredUser.generateToken()
        //TODO: Set the cookie with a more reasonable expiration time (e.g., 1 hour)
        const expirationTime = new Date(Date.now() + 1 * 60 * 60 * 1000)

        resp.status(200)
            .cookie('cookie', token, {
                expires: expirationTime,
                httpOnly: true,
            })
            .json({
                success: true,
                userInfo: registeredUser,
                token,
                message: 'Login Successful',
            })
    } catch (error: any) {
        next(new ErrorHandler(500, 'Internal Server Error'))
    }
}
//get all users
const allUsers = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const registeredUsers = await UserModel?.aggregate([
            { $sample: { size: 3 } }, //pipeline
        ])
        if (!registeredUsers || !registeredUsers.length) {
            return next(new ErrorHandler(400, 'No Users Found'))
        }
        resp.status(200).json({
            success: true,
            message: 'All Users Found',
            registeredUsers,
        })
    } catch (error) {
        next(new ErrorHandler(500, 'Server failed to response'))
    }
}
//get users by (ID)
const getSingleUser = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    try {
        const _id = req.params.id
        ///find user by id.
        const user = await UserModel.findById({ _id })
        resp.status(200).json({ success: true, user })
    } catch (error) {
        next(new ErrorHandler(404, 'User Not Found'))
    }
}
/// ADD/NEW POST CONTROLLER
const addPost = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const { userId, post } = req.body
        const users = await UserModel.findById({ _id: userId })
        if (!users) next(new ErrorHandler(404, 'No User Found'))
        const data = await PostModel.create({
            userId,
            fullname: users?.name,
            username: users?.username,
            email: users?.email,
            imageUrl: users?.imagePath,
            post,
        })
        resp.status(200).json({
            success: true,
            message: 'Successful add post',
            data,
        })
    } catch (error) {
        next(new ErrorHandler(400, 'Server Error'))
    }
}
//// GET ALL POST.
const getPost = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const userPost = await PostModel.find().sort({ createdAt: -1 })
        if (!userPost || !userPost.length) {
            return next(new ErrorHandler(404, 'No Post Found'))
        }
        resp.status(200).json({
            success: true,
            allPosts: userPost,
            message: 'Successful',
        })
    } catch (error) {
        next(new ErrorHandler(500, 'Server Failed to response'))
    }
}
/// UPDATE LIKES .
const likePost = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const { postId, userId } = req.body
        const response = await PostModel.updateOne(
            { _id: postId },
            { $addToSet: { likes: userId } }
        )
        if (!response.modifiedCount) {
            return next(new ErrorHandler(401, 'Try Again..'))
        }
        const post = await PostModel.findById({ _id: postId })
        const totalLikes = post?.likes?.length
        resp.status(200).json({ message: 'success', post, totalLikes })
    } catch (error) {
        next(new ErrorHandler(500, 'Error --- Try Again'))
    }
}
export {
    getData,
    registerUser,
    loginUser,
    addPost,
    getPost,
    allUsers,
    likePost,
    getSingleUser,
}
