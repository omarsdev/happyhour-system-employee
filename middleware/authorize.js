const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const { con } = require("../config/db");

exports.protectEmployee = asyncHandler(async(req, res, next) => {
    //take token
    let token;
    //check Headers autherization
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    //Make Sure Token exists
    if (!token) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }

    try {
        //Verify Token
        //1 - extract the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //req.employee = await Employee.findById(decoded.id);
        req.employee = await con.query("SELECT * FROM employee WHERE id = $1", [decoded.id]);

        next();
    } catch (err) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }
});