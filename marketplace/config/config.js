const config = {
        env: process.env.NODE_ENV || 'development', 
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
        mongoUri: process.env.MONGODB_URI || "mongodb+srv://mtoleran:1bqvWNPXh8nSnc2u@cluster0.dlr73vq.mongodb.net/Marketplace?retryWrites=true&w=majority" ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' + 
    (process.env.MONGO_PORT || '27017') +
        '/marketplace'
    }

export default config