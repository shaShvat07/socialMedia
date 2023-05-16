const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.post);

        if(post){
            try {
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            } catch (error) {
                console.log('Error in adding the comment' , error);
            }
        }
    } catch (error) {
        console.log('Error in adding the comment' , error);
    }
}