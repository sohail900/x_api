import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true,
    }
)
export const PostModel = mongoose.model('userPost', postSchema)
