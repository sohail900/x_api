"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.likePost = exports.allUsers = exports.getPost = exports.addPost = exports.loginUser = exports.registerUser = exports.getData = void 0;
const userSchema_1 = require("../schema/userSchema");
const postSchema_1 = require("../schema/postSchema");
const errorHandler_1 = require("../middleware/error/errorHandler");
const getData = (req, resp, next) => {
    const user = req.user;
    resp.status(200).json({ someData: 'this is sohail here', user });
};
exports.getData = getData;
///Register Controller.
const registerUser = async (req, resp, next) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;
        const imagePath = req.file?.path;
        // Check if the user already exists with the provided email.
        const checkUser = await userSchema_1.UserModel.findOne({ email });
        if (checkUser === null) {
            //<> if user not exist // add new user
            const user = new userSchema_1.UserModel({
                name,
                username,
                email,
                password,
                imagePath,
            });
            //save user in our database
            const save = await user.save();
            return resp.status(201).json({
                success: true,
                message: 'successful add new user',
                userInfo: save,
            });
        }
        resp.status(409).json({
            success: false,
            message: 'User Already Exists',
        });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(500, error.message));
    }
};
exports.registerUser = registerUser;
///Login Controller.
const loginUser = async (req, resp, next) => {
    try {
        const { email, password } = req.body;
        // Verify User Credentials
        const registeredUser = (await userSchema_1.UserModel.findOne({ email })); //NOTE: Type Casting
        //<> If User Not Found
        if (!registeredUser ||
            !(await registeredUser.comparePassword(password))) {
            resp.status(401).json({
                success: false,
                message: 'Invalid Credentials',
            });
        }
        //TODO: Generate JWT tokens (....)
        const token = await registeredUser.generateToken();
        //TODO: Set the cookie with a more reasonable expiration time (e.g., 1 hour)
        const expirationTime = new Date(Date.now() + 1 * 60 * 60 * 1000);
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
        });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(500, 'Internal Server Error'));
    }
};
exports.loginUser = loginUser;
//get all users
const allUsers = async (req, resp, next) => {
    try {
        const registeredUsers = await userSchema_1.UserModel?.aggregate([
            { $sample: { size: 3 } }, //pipeline
        ]);
        if (!registeredUsers || !registeredUsers.length) {
            return next(new errorHandler_1.ErrorHandler(400, 'No Users Found'));
        }
        resp.status(200).json({
            success: true,
            message: 'All Users Found',
            registeredUsers,
        });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(500, 'Server failed to response'));
    }
};
exports.allUsers = allUsers;
//get users by (ID)
const getSingleUser = async (req, resp, next) => {
    try {
        const _id = req.params.id;
        ///find user by id.
        const user = await userSchema_1.UserModel.findById({ _id });
        resp.status(200).json({ success: true, user });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(404, 'User Not Found'));
    }
};
exports.getSingleUser = getSingleUser;
/// ADD/NEW POST CONTROLLER
const addPost = async (req, resp, next) => {
    try {
        const { userId, post } = req.body;
        const users = await userSchema_1.UserModel.findById({ _id: userId });
        if (!users)
            next(new errorHandler_1.ErrorHandler(404, 'No User Found'));
        const data = await postSchema_1.PostModel.create({
            userId,
            fullname: users?.name,
            username: users?.username,
            email: users?.email,
            imageUrl: users?.imagePath,
            post,
        });
        resp.status(200).json({
            success: true,
            message: 'Successful add post',
            data,
        });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(400, 'Server Error'));
    }
};
exports.addPost = addPost;
//// GET ALL POST.
const getPost = async (req, resp, next) => {
    try {
        const userPost = await postSchema_1.PostModel.find().sort({ createdAt: -1 });
        if (!userPost || !userPost.length) {
            return next(new errorHandler_1.ErrorHandler(404, 'No Post Found'));
        }
        resp.status(200).json({
            success: true,
            allPosts: userPost,
            message: 'Successful',
        });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(500, 'Server Failed to response'));
    }
};
exports.getPost = getPost;
/// UPDATE LIKES .
const likePost = async (req, resp, next) => {
    try {
        const { postId, userId } = req.body;
        const response = await postSchema_1.PostModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } });
        if (!response.modifiedCount) {
            return next(new errorHandler_1.ErrorHandler(401, 'Try Again..'));
        }
        const post = await postSchema_1.PostModel.findById({ _id: postId });
        const totalLikes = post?.likes?.length;
        resp.status(200).json({ message: 'success', post, totalLikes });
    }
    catch (error) {
        next(new errorHandler_1.ErrorHandler(500, 'Error --- Try Again'));
    }
};
exports.likePost = likePost;
//# sourceMappingURL=controller.js.map