import express from "express";
import databaseConn from "./config/database.js";
import userSchema from "./models/User.js";

export default class App {

    constructor() {
        this.expressInstance = express();
        this.db = new databaseConn();
        this.User = new userSchema();
    }

    async onExecute() {
        console.log("Setting up express middlewares...");
        this.serverConnection();
        this.userSignup();
        console.log("Express middlewares setup completed.");
    }

    async serverConnection() {
        try {
            await this.db.connectDB();
            const server = this.expressInstance.listen(3001, () => {
                console.log(`Server is listening at the port: ${server.address().port}`)
            });
        } catch (error) {
            console.error(`Error setting up express: ${error.message}`);
            process.exit(1);
        }
    }

    async userSignup() {
        this.expressInstance.use(express.json());
        this.expressInstance.post("/signup", async (req, res) => {
            try {
                const userModel = this.User.getSchema();
                const User = new userModel({
                    name: "Alex Smith",
                    email: "alex.smith@gmail.com",
                    password: "password123",
                    isAdmin: req.body.isAdmin || false
                });
                await User.save();
                res.status(200).json({ message: "User signed up successfully" });
            } catch (error) {
                console.error(`Error during user signup: ${error.message}`);
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}

const app = new App();
app.onExecute().then(() => {
    console.log("App is running successfully.");
}).catch((error) => {
    console.error(`Error in app execution: ${error.message}`);
    process.exit(1);
});