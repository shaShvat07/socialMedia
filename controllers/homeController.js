const Post = require('../models/post');
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('lahot' , 'bsdk');

    let posts = await Post.find({}).populate('user');

    return res.render('home' ,{
        title: "SHIELD",
        posts: posts
    });
}