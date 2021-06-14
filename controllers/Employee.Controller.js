const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const jwtGenerator = require("../utils/jwtGenerator");
const { checkEmailName, checkPassword } = require("../utils/employeeFunctions");
const con = require("../config/db");
const bcrypt = require("bcrypt");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");
const { json } = require("body-parser");

exports.getEmployees = asyncHandler(async(req, res, next) => {
    const employees = await queryConnection("select * from employee").then(
        (result) => {
            res.json({
                success: true,
                data: result
            });
        }
    );
});

exports.createEmployee = asyncHandler(async(req, res, next) => {
    const {
        position_id,
        department_id,
        first_name,
        last_name,
        email,
        password,
        birth_date,
        nationality,
        marital_status,
        marital_date,
        type,
        income_status,
        isManager,
    } = req.body;

    /* if (marital_status == 0) {
        marital_date = null;
    } */

    //Validation email
    if (!checkEmailName(email)) {
        return next(new ErrorResponse("Error in email", 400));
    }

    // CHECK IF EMAIL EXISTS PROCEDURE
    const addEmployeeCheck = await queryParamsConnection(
        "call addEmployeeCheck(?)",
        `${email}`
    ).then((result) => {
        return result[0][0].isExists;
    });
    if (addEmployeeCheck == -1) {
        return next(new ErrorResponse(`Email Exists`, 400));
    }

    //Validation password
    if (!checkPassword(password)) {
        return next(
            new ErrorResponse(
                "Password should contain atleast one number and one special character",
                400
            )
        );
    }

    const salt = await bcrypt.genSalt(10);
    const bpassword = await bcrypt.hash(password, salt);

    const createEmployee = await queryParamsArrayConnection(
        "INSERT INTO employee(position_id, department_id, first_name, last_name, email, password, birth_date, nationality, marital_status, marital_date, type, income_status, isManager, isTerminated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            position_id,
            department_id,
            first_name,
            last_name,
            email,
            bpassword,
            birth_date,
            nationality,
            marital_status,
            marital_date,
            type,
            income_status,
            isManager,
            false
        ]
    ).then((result) => {

    });

    var id;
    const emp_id = await queryParamsConnection("SELECT id FROM employee WHERE email = ?", [email]).then((result) => { id = result[0].id });

    console.log(id);
    const token = jwtGenerator(id);

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
    });
});

exports.getEmployeesByDepId = asyncHandler(async(req, res, next) => {
    const employees = await queryParamsArrayConnection(
        "SELECT * FROM employee WHERE department_id = ?", [req.params.id]
    ).then((result) => {
        /* res.json({
            data: result,
        }); */
    });
    /* if (employees.length == 0) {
        res.json({
            success: false,
            msg: "There is no employees"
        });
    } */
    res.json({
        success: true,
        data: employees,
    });
});

exports.getEmployeebyId = asyncHandler(async(req, res, next) => {
    const employee = await queryParamsArrayConnection(
        "SELECT * FROM employee WHERE id = ?", [req.params.id]
    ).then((result) => {
        /* res.json({
            data: result,
        }); */
    });
    res.json({
        success: true,
        data: employee,
    });
});

exports.Login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Check if fileds are not empty", 400));
    }
    const Login = await queryParamsConnection(
        "SELECT * FROM employee WHERE email = ?",
        email
    ).then((result) => {
        return result;
    });
    if (Login.length == 0) {
        return next(new ErrorResponse("Re-enter the email please", 401));
    }

    const valid = await bcrypt.compare(password, Login[0].password);
    if (!valid) {
        return next(new ErrorResponse("Invalid Credentials", 401));
    }

    var id;
    const emp_id = await queryParamsConnection("SELECT id, isTerminated FROM employee WHERE email = ?", [email]).then((result) => {
        if (result[0].isTerminated) {
            return next(new ErrorResponse("YOU'RE FIRED !!", 401));
        }
        id = result[0].id;
    });

    const token = jwtGenerator(id);

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
    });

    // const jwtToken = jwtGenerator(Login.rows[0].id);
    // const options = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // };

    // //sendTokenResponse(user, 200, res);
    // res.status(statusCode).cookie("token", jwtToken, options).json({
    //   success: true,
    //   jwtToken,
    /* res.status(201).json({
        success: true,
    }); */
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

exports.UpdateEmployeeById = asyncHandler(async(req, res, next) => {
    const {
        position_id,
        department_id,
        first_name,
        last_name,
        email,
        birth_date,
        nationality,
        marital_status,
        marital_date,
        type,
        income_status,
        isManager,
    } = req.body;

    /* if (marital_status == 0) {
        marital_date = null;
    } */

    const UpdateEmployeeById = await queryParamsArrayConnection(
        `UPDATE employee SET position_id = ?, department_id = ?, first_name = ?, last_name = ?, email = ?,birth_date = ?, nationality = ?,marital_status = ?, marital_date = ?, type = ?, income_status = ?, isManager = ? WHERE id = ?`, [
            position_id,
            department_id,
            first_name,
            last_name,
            email,
            birth_date,
            nationality,
            marital_status,
            marital_date,
            type,
            income_status,
            isManager,
            req.params.id,
        ]
    ).then((result) => {
        res.status(200).json({
            success: true,
            data: result,
        });
    });
});

exports.Terminate = asyncHandler(async(req, res, next) => {
    const UpdateEmployeeById = await queryParamsArrayConnection(
        "UPDATE employee SET isTerminated = ? WHERE id = ?", [1, req.params.id]
    ).then((result) => {
        res.status(200).json({
            success: true,
            data: result,
        });
    });
});

exports.ChangePassword = asyncHandler(async(req, res, next) => {
    const { password } = req.body;

    //Validation password
    if (!checkPassword(password)) {
        return next(
            new ErrorResponse(
                "Password should contain atleast one number and one special character",
                400
            )
        );
    }

    const salt = await bcrypt.genSalt(10);
    const bpassword = await bcrypt.hash(password, salt);

    const UpdateEmployeeById = await queryParamsArrayConnection(
        `UPDATE employee SET 
    password = ? 
    WHERE id = ?`, [
            bpassword,
            req.params.id,
        ]
    ).then((result) => {
        res.status(200).json({
            success: true,
            data: result,
        });
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