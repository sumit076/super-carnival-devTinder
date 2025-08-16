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

const app = express();

app.get("/user", (req, res) => {
    // console.log(req.query);
    // console.log(req.params); - "/user/:userId/:name/:password"
    res.send({ firstName: "Sumit", lastName: "Saha" });
});

app.post("/user", async (req, res) => {
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