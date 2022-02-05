const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// other Routes
const blogRoutes = require("./routes/blogsRoutes");

// app
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}



//// routes
// app.get("/api", (req, res)=>{
//     res.json({time:Date().toString()})
// });
// routes middleware
app.use("/api", blogRoutes);




// database connect
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.log("Could not connect to MongoDB.", err))

// port
const port = process.env.PORT || 8000;

// server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
