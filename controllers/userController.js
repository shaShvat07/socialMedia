const User = require('../models/user');


module.exports.profile = async function (req, res) {

    let user = await User.findById(req.params.id);

    return res.render('user-profile', {
        title: "User Profile",
        profile_user: user
    });
}

module.exports.update = async function(req,res) {
    try {
            if(req.user.id == req.params.id)
            {
                let user = await User.findByIdAndUpdate(req.params.id , req.body);
                return res.redirect('back');
            }
            else{
                return res.status(401).send('Unauthorised!');
            }
    } catch (error) {
        console.log('Error in updating the profile!!', error);
    }
}
//Render the signUp Page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//Render the signIn Page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//Sign up
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        let  user = await User.findOne({email: req.body.email});

        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error detected", err);
    }
}




//Sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

//Destroy the session 
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
