import mongoose from "mongoose";
import validator from "validator";

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
                unique: true,
                validate(value) {
                    if (!(['gmail.com', 'outlook.com', 'rediffmail.com'].includes(value.split('@')[1]))) {
                        throw new Error("Email domain must be one of gmail.com, outlook.com, rediffmail.com");
                    }
                }
            },
            password: {
                type: String,
                required: true,
                default: "password1234",
                validate(value) {
                    if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
                        throw new Error("Password is not strong enough. It should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.");
                    }
                }
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        }, { timestamps: true });
    }

    getSchema() {
        return mongoose.models.User || mongoose.model('User', this.schema);
    }
}