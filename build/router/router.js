"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const imageUploader_1 = __importDefault(require("../middleware/imageUploader"));
const authUser_1 = __importDefault(require("../middleware/auth/authUser"));
/*
  @SET EXPRESS ROUTER
*/
const Router = express_1.default.Router();
Router.route('/test').get((req, resp) => {
    resp.status(200).send('TEST ROUTE').json({
        success: true,
        message: 'This is for testing router check if this work or not',
    });
});
Router.route('/home').get(authUser_1.default, controller_1.getData);
Router.route('/login').post(controller_1.loginUser);
Router.route('/register').post(imageUploader_1.default.single('image'), controller_1.registerUser);
Router.route('/registered/user').get(authUser_1.default, controller_1.allUsers);
Router.route('/post').post(controller_1.addPost);
Router.route('/get_post').get(controller_1.getPost);
Router.route('/like/add').put(controller_1.likePost);
Router.route('/profile/:id').get(controller_1.getSingleUser);
exports.default = Router;
//# sourceMappingURL=router.js.map