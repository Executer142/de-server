import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true
    },
    tag: {
        type:Array,
        default:[]
    },
    viewsCount: {
        type:Number,
        default:0
    },
    image:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
}, {
    timestamps:true,
})

export default mongoose.model('Post',PostSchema);