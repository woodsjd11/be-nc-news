const express = require("express");
const { getTopics } = require("./controllers");
const app = express();

app.get("/api/topics", getTopics);
app.use('*', (req, res) =>{
    res.status(404).send({message: "404 Error: Invalid Path"})
})
module.exports = app;
