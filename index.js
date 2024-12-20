const express = require("express");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");
const errorhandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ type: 'application/json' }));
// app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(xss());

app.get("/", (req, res, next) => {
    res.send("Welcome to Happy Hour...");
});

app.use("/api/v1/employee", require("./routes/Employee.Routes"));
app.use("/api/v1/country", require("./routes/Country.Routes"));
app.use("/api/v1/report", require("./routes/Report.Routes"));
app.use("/api/v1/city", require("./routes/City.Routes"));
app.use("/api/v1/agency", require("./routes/Agency.Routes"));
app.use("/api/v1/department", require("./routes/Department.Routes"));
app.use("/api/v1/position", require("./routes/Position.Routes"));
app.use("/api/v1/promotion", require("./routes/Promotion.Routes"));
app.use("/api/v1/report", require("./routes/Report.Routes"));
//app.use("/api/v1/role", require("./routes/Role.Routes"));

app.use(errorhandler)

const server = app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT = ${process.env.PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});