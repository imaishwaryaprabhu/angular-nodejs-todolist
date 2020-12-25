const taskRoutes = require("./routes/task");
const helper = require('./helper');

const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb', extended: false }));

let viewDirectory = __dirname + '/views';
app.use("/", express.static(viewDirectory));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/tasks", taskRoutes);
app.all('*', (req, res) => {
    res.status(200).sendFile(viewDirectory + '/index.html')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    helper.initaliseDatabase();
    console.log(`Server started on http://localhost:${port}`);
});