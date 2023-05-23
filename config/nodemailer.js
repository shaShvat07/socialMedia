const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'shashvatgreat@gmail.com',
        pass: 'uknbkqbejaxnxxnq'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        // relative path is where this function is called
        path.join(__dirname , '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err) { console.log('error in rendering template ! '); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
