const express = require('express')

const app = express();
const bodyParser = require('body-parser');
//middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//db
const mongoose = require('mongoose');

mongoose.connect("mongodb collection url", {
        useNewUrlParser: true,

    })
    .then(console.log("MongoDbConnected"))
    .catch((err) => console.log(err));

const news = require('./routes/news');

app.use('/news', news);

port = process.env.PORT || 5000

app.listen(port, () => console.log("Server is running at port :" + port))