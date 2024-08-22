const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes/endpoint');

app.use('/', routes);

app.get('/test', (req, res) => {
    return res.send("app.js routes");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
