const express = require('express');
const app = express();
const port = process.env.port || 8080;

const professionalRoutes = require("./routes/professional");

// Equivalente a bodyParser.json()  from Express v4.16+ body-parser installation isn't necessary
app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); // Equivalente a bodyParser.urlencoded()

// app.get( '/', (req, res) => {
//     res.send("The server is running now over render.com");
// });

app.use( (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use("/professional", professionalRoutes);

app.listen(port);

// console.log(`Server started on port ${port}`);