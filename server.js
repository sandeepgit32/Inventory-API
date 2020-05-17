const express = require('express');
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("hbs")
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerDoc");


const productRouter = require('./inventory-api/routes/product.routes');
// const supplierRouter = require('./inventory-api/routes/supplier.routes');
// const customerRouter = require('./inventory-api/routes/customer.routes');


// create express app
const app = express();
app.use(logger("dev"));

// view engine setup
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "inventory-api", "views"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

// swagger doc
app.use("/inventory-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Configuring the database
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});


//Route Prefixes
app.get("/", function (req, res) {
    res.render("index", {
        name: "Sandip"
    });
});


app.use('/products', productRouter);
// app.use('/suppliers', supplierRouter);
// app.use('/customers', customerRouter);


// listen for requests
app.listen(port, () => {
    console.log("Server is running on http//127.0.0.1:3000");
});
