/*
- package.json helps to manage the dependencies and scripts for the project, if node_modules is not present, it can be installed using `npm install`
- .gitignore is used to specify files and directories that should not be tracked by git,
- in this case, it is used to ignore the node_modules directory.
- app.js is the main entry point of the application, it sets up an Express server and
- defines a route that responds to requests made to `/index`.
- The server listens on port 3003 and responds with a message indicating the request URL and port number.
- This code is part of a Node.js application that uses Express to create a simple server.
- Added scripts in package.json to start the server in different environments.
*/

import express from "express";
import { AuthMiddleware } from "./middlewares/auth.js";

const app = express();

/**
 * Middleware setup to check if the user is authenticated as an admin or a regular user.
 * The `isAdminAuthenticated` middleware checks for an admin authentication header,
 * while the `isUserAuthenticated` middleware checks for a user authentication header.
 * Two different ways to authenticate and write the code for the same functionality. 
 */
// -------------------------------------------------------------
app.use("/admin", AuthMiddleware.isAdminAuthenticated);

app.get("/admin/dashboard", (req, res) => {
    res.send("Welcome to Admin Dashboard");
});

app.get("/user/dashboard", AuthMiddleware.isUserAuthenticated, (req, res) => {
    res.send("Welcome to User Dashboard");
});
// -------------------------------------------------------------

/*
- app.get("/user", (req, res) => {}); -> // http://localhost:3003/user?userid=101&name="server" ; result: { firstName: "Sumit", lastName: "Saha" }
- app.get("/user/:userId/:name/:password", (req, res) => {}); -> // http://localhost:3003/user/101/server/password ; result: { userId: "101", name: "server", password: "password" }
*/
app.get("/user", (req, res) => {
    // console.log(req.query);
    // console.log(req.params);
    // res.redirect("https://sumit076.github.io/")     // res.redirect("/user/userAuthentication");
    res.send({ firstName: "Sumit", lastName: "Saha" });
});

app.get("/error", (req, res, next) => {
    try {
        if (!req.query.id) {
            throw new Error("User Id is missing!!")
        }
        res.send({ firstName: "Sumit", lastName: "Saha" });
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.get("/user/userAuthentication", async (req, res) => {
    // console.log(req.body);   
    // Update the code with the logic for upsert
    res.send("Successfully Updated!!!")
})

app.use("/index", (req, res, next) => {
    // res.send("Server is live!!")
    res.send(`Request has been made to: ${req.url} ${req.body} ${server.address().port}`);
    // next();
})

const server = app.listen(3003, () => {
    console.log(`Server is started successfully on port ${server.address().port}`);
});