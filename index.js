const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const professionalRoutes = require("./routes/professional");

dotenv.config();

const app = express();
const port = process.env.port || 8080;



// New way to use  bodyParser.json(). From Express v4.16+ body-parser installation isn't necessary
app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); // Equivalente a bodyParser.urlencoded()

// app.get( '/', (req, res) => {
//     res.send("The server is running now over render.com");
// });

app.use( (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

async function startServer() {
    try {
        await connectDB();
        app.use('/', professionalRoutes);
        app.listen(port, () => {
            console.log(`Server running over `)
        })
    } catch (err) {
        console.error(`${err} Error connecting to Server`);
    }
}

startServer();
// app.listen(port);

// console.log(`Server started on port ${port}`);