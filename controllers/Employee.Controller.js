const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { jwtGenerator } = require("../utils/jwtGenerator");
const { checkEmailName, checkPassword } = require("../utils/employeeFunctions");
const con = require("../config/db");
const bcrypt = require("bcrypt");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getEmployees = asyncHandler(async (req, res, next) => {
  const getEmployees = await queryConnection("select * from employee").then(
    (result) => {
      res.json({
        success: true,
      });
    }
  );
});

exports.createEmployee = asyncHandler(async (req, res, next) => {
  const {
    // position_id,
    // department_id,
    first_name,
    last_name,
    password,
    email,
    birth_date,
    nationality,
    marital_status,
    type,
    income_status,
    isManager,
    marital_date,
  } = req.body;

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
    "INSERT INTO employee(first_name, last_name, password, email, birth_date, nationality, marital_status, type, income_status, isManager, marital_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      position_id,
      department_id,
      first_name,
      last_name,
      bpassword,
      email,
      birth_date,
      nationality,
      marital_status,
      type,
      income_status,
      isManager,
      marital_date,
    ]
  ).then((result) => {
    res.json({
      data: result,
    });
  });
});

exports.Login = asyncHandler(async (req, res, next) => {
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
  res.status(201).json({
    success: true,
  });
});

exports.Logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.UpdateEmployeeById = asyncHandler(async (req, res, next) => {
  const {
    position_id,
    department_id,
    first_name,
    last_name,
    password,
    birth_date,
    marital_status,
    type,
    income_status,
    isManager,
    marital_date,
    termination,
  } = req.body;

  if(marital_status == 0) {
    marital_date == null;
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

  const UpdateEmployeeById = await queryParamsArrayConnection(
   `UPDATE employee SET 
    position_id = ?, 
    department_id = ?, 
    first_name = ?, 
    last_name = ?, 
    password = ?, 
    birth_date = ?, 
    marital_status = ?, 
    type = ?, 
    income_status = ?, 
    isManager = ?, 
    marital_date = ?,
    termination = ?
    WHERE id = ?`,
    [
      position_id,
      department_id,
      first_name,
      last_name,
      password,
      birth_date,
      marital_status,
      type,
      income_status,
      isManager,
      marital_date,
      termination,
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
