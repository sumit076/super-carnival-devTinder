import mongoose from "mongoose";

export default class userSchema {
    constructor() {
        this.schema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        });
    }

    getSchema() {
        return mongoose.models.User || mongoose.model('User', this.schema);
    }
}