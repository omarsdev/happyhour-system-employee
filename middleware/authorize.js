const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const con = require("../config/db");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");

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
        req.employee = await queryParamsConnection("SELECT * FROM employee WHERE id = ?", [decoded.user.id]).then((result) => {
            /* res.status(201).json({
                success: true,
                data: result,
            }); */
            return result;
        });

        next();
    } catch (err) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }
});

exports.authorize = (...roles) => {
    return async(req, res, next) => {
        const position_name = await queryParamsConnection("SELECT pos.name AS name FROM employee INNER JOIN pos ON employee.position_id = pos.id WHERE employee.id = ?", [req.employee[0].id]).then((result) => {
            /* res.status(201).json({
                success: true,
                data: result,
            }); */
            return result;
        });
        //console.log(position_name);
        if (!roles.includes(position_name[0].name)) {
            return next(
                new ErrorResponse(
                    `Employee Role ${position_name[0].name} is unautherized to access this routes`,
                    401
                )
            );
        }
        next();
    };
};