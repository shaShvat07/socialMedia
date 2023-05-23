const nodeMailer = require('../config/nodemailer');

//This is another way of exporting a method

exports.newComment = (comment) => {

    console.log('Inside newComment mailer! ');

    nodeMailer.transporter.sendMail({
        from: 'shashvatgreat@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!" ,
        html: '<h1>Yup, your comment has been published! </h1>'
    },(err, info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message Sent!', info);
        return;
    });
}