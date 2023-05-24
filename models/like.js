const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // This defines the object Id of the liked object!
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // This field is used for defining the types of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post' , 'Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like' , likeSchema );
module.exports = Like;