const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const con = require("../config/db");

exports.protect = asyncHandler(async(req, res, next) => {
    //take token
    let token;
    //check Headers autherization
    console.log(req.headers.authorization);
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
        req.employee = await con.query("SELECT * FROM employee WHERE id = ?", [decoded.id], (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
        });

        console.log(req.employee[0]);

        next();
    } catch (err) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }
});

exports.authorize = (...roles) => {
    return async(req, res, next) => {
        const position = await con.query("SELECT position.name FROM employee INNER JOIN position ON employee.position_id = position.id WHERE employee.id = ?", [req.employee.id], (err, result) => {});
        if (!roles.includes(position)) {
            return next(
                new ErrorResponse(
                    `Employee Role ${position} is unautherized to access this routes`,
                    401
                )
            );
        }
        next();
    };
};