const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'lambda_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'shashvatgreat@gmail.com',
            pass:  'uknbkqbejaxnxxnq'
        }
    },
    google_client_id: "297118051058-8h8h9bqbtndbfkhjkbe39qru7mkm2cp7.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'lambda'


}

const production = {
    name: 'production',
    asset_path: process.env.LAMBDA_ASSETS_PATH,
    session_cookie_key: process.env.LAMBDA_SESSION_COOKIE_NAME,
    db: process.env.LAMBDA_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.LAMBDA_USER_GMAIL,
            pass:  process.env.LAMBDA_GMAIL_PASS
        }
    },
    google_client_id: process.env.LAMBDA_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.LAMBDA_CLIENT_SECRET,
    google_callback_url: process.env.LAMBDA_CALLBACK_URL,
    jwt_secret: process.env.LAMBDA_JWT_SECRET
}

module.exports = eval(process.env.LAMBDA_ENVIRONMENT) == undefined ? development : eval(process.env.LAMBDA_ENVIRONMENT);