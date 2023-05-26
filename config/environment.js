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
    name: 'production'
}

module.exports = development;