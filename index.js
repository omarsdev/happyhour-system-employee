const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(xss());

app.get("/", (req, res, next) => {
    res.send("Welcome to Happy Hour...");
});

//app.use("/api/v1/employee", require("./routes/Employee.Routes"));
app.use("/api/v1/country", require("./routes/Country.Routes"));
//app.use("/api/v1/city", require("./routes/City.Routes"));
//app.use("/api/v1/agency", require("./routes/Agency.Routes"));

const server = app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT = ${process.env.PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});