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
        this.getUserDetailsByEmail();
        this.getAllUserDetails();
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
                    email: "alex.smith1@gmail.com",
                    password: "password1234",
                    isAdmin: req.body.isAdmin || false
                });
                await User.save();
                res.status(200).json({ message: "User signed up successfully" });
            } catch (error) {
                console.error(`Error during user signup: ${error.message}`);
                res.status(500).json({ message: `Internal Server Error + ${error.message}` });
            }
        });
    }

    // Get User Details through API and handle the error if not found
    async getUserDetailsByEmail() {
        this.expressInstance.use(express.json());
        this.expressInstance.get("/getUserByEmail", async (req, res) => {
            try {
                const userModel = this.User.getSchema();
                const arr = await userModel.find({ email: req.query.email });
                if (!arr.length) {
                    return res.status(400).json({ message: "User Not Found!!" })
                }
                res.status(200).json({
                    message: `User details fetched successfully`,
                    data: arr
                });
            } catch (error) {
                res.status(400).json({ message: `Error: ${error.message}` })
            }
        })
    }

    // Get all the user's details from the User Collection
    async getAllUserDetails() {
        this.expressInstance.use(express.json());
        this.expressInstance.get("/getAllUserDetails", async (req, res) => {
            try {
                const userModel = this.User.getSchema();
                const arr = await userModel.find({});
                if (!arr.length) { return res.status(404).json({ message: "Collection is empty." }) }
                res.status(200).json({
                    message: "Fetched Successfully",
                    data: arr,
                    status: "success",
                    meta: { count: arr.length },
                    timestamp: new Date().toISOString(),
                    code: "USER_200",
                    version: "1.0.0",
                    environment: process.env.NODE_ENV || 'development',
                    path: req.originalUrl,
                    // method: req.method,
                    // requestId: req.id
                })
            } catch (error) {
                res.status(404).json({ message: `Error: ${error.message}` })
            }
        })
    }
}

const app = new App();
app.onExecute().then(() => {
    console.log("App is running successfully.");
}).catch((error) => {
    console.error(`Error in app execution: ${error.message}`);
    process.exit(1);
});