const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { jwtGenerator } = require("../utils/jwtGenerator");
const { con } = require("../config/db");
const bcrypt = require("bcrypt");

exports.createEmployee = asyncHandler(async(req, res, next) => {
    const { position_id, department_id, first_name, last_name, email, password, birth_date, nationality, marital_status, type, income_status, isManager } = req.body;
    try {
        const verify = await con.query("SELECT * FROM employee WHERE email = $1", [email]);

        //const emp = await con.query("SELECT * FROM employee WHERE email = $1", [email]);
        if (verify.rows.length > 0) {
            return next(new ErrorResponse("Email already exist !!!", 401));
        }

        const salt = await bcrypt.genSalt(process.env.SALT);
        const bpassword = await bcrypt.hash(password, salt);

        const emp = await con.query("INSERT INTO employee(position_id, department_id, first_name, last_name, email, password, birth_date, nationality, marital_status, type, income_status, isManager, create_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", [position_id, department_id, first_name, last_name, email, bpassword, birth_date, nationality, marital_status, type, income_status, isManager, Date.now]);

        const jwtToken = jwtGenerator(emp.rows[0].id);

        const options = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        res.status(statusCode).cookie("token", jwtToken, options).json({
            success: true,
            jwtToken,
        });
    } catch (err) {
        console.log(err);
    }
});

exports.Login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(
                new ErrorResponse("Check if email or password are written", 400)
            );
        }

        const emp = await con.query("SELECT * FROM employee WHERE email = $1", [email]);

        if (emp.rows.length == 0) {
            return next(new ErrorResponse("Re-enter please", 401));
        }

        const valid = await bcrypt.compare(password, emp.rows[0].password);

        if (!valid) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const jwtToken = jwtGenerator(emp.rows[0].id);

        const options = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        //sendTokenResponse(user, 200, res);
        res.status(statusCode).cookie("token", jwtToken, options).json({
            success: true,
            jwtToken,
        });
    } catch (err) {

    }
});

exports.Logout = asyncHandler(async(req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: {},
    });
});

/* const sendTokenResponse = (user, statusCode, res) => {

    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
    });
}; */