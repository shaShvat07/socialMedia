module.exports.home = function(req, res){
    console.log(req.cookies);
    // res.cookie('lahot' , 'bsdk');
    return res.render('home' ,{
        title: "Home"
    });
}