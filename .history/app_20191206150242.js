const express = require ("express");
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const cors = require('cors'); 
const expressValidator = require('express-validator')

require ('dotenv').config();
//import routes
const authRoutes = require ('./routes/auth')
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const mpRoutes = require("./routes/mp")
const braintreeRoutes = require("./routes/braintree")
const orderRoutes = require("./routes/order")
const placeRoutes = require("./routes/place")

// app
const app = express();

//db
mongoose
    .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => console.log("DB Connected"));


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


//routes  userRoutes as middleware -> http://localhost:8000/api
//console.log(userRoutes, categoryRoutes, productRoutes)
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", mpRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);
app.use("/api",placeRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

