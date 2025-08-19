import mongoose from 'mongoose';

export default class databaseConn {

    constructor() {
        process.env.MONGO_URI = process.env.MONGO_URI; // Provide the cluster / db uri to connect to the database
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
