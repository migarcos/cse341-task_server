const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get( '/', (req, res) => {
    res.send("The changes must be saved after reloading the server");
});

app.listen(port);

console.log(`Server started on port ${port}`);