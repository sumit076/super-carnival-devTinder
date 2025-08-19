import mongoose from 'mongoose';

export default class databaseConn {

    constructor() {
        process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Cluster0:yHqkRd84ONvgew02@cluster0.hvrh4t8.mongodb.net/devTinder';
    }

    async connectDB() {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}