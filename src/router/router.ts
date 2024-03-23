import express from 'express'
import {
    getData,
    registerUser,
    loginUser,
    addPost,
    getPost,
    allUsers,
    likePost,
    getSingleUser,
} from '../controller/controller'
import upload from '../middleware/imageUploader'
import authorizeUser from '../middleware/auth/authUser'
/* 
  @SET EXPRESS ROUTER
*/
const Router = express.Router()

Router.route('/test').get((req, resp) => {
    resp.status(200).send('TEST ROUTE').json({
        success: true,
        message: 'This is for testing router check if this work or not',
    })
})
Router.route('/home').get(authorizeUser, getData)
Router.route('/login').post(loginUser)
Router.route('/register').post(upload.single('image'), registerUser)
Router.route('/registered/user').get(authorizeUser, allUsers)
Router.route('/post').post(addPost)
Router.route('/get_post').get(getPost)
Router.route('/like/add').put(likePost)
Router.route('/profile/:id').get(getSingleUser)
export default Router
