const con = require("../config/db");
const ErrorResponse = require("./errorResponse");


exports.queryConnection = (QUERY) => {
    return new Promise(function(resolve, reject) {
        con.query(
            `${QUERY}`,
            function(err, rows) {
                if (rows === undefined) {
                    reject(new ErrorResponse(`Error : ${err}`, 400));
                } else {
                    resolve(rows);
                }
            }
        )
    })
}

exports.queryParamsConnection = (QUERY, PARAMS) => {
    return new Promise(function(resolve, reject) {
        con.query(
            `${QUERY}`, PARAMS,
            function(err, rows) {
                if (rows === undefined) {
                    reject(new ErrorResponse(`Error : ${err}`, 400));
                } else {
                    resolve(rows);
                }
            }
        )
    })
}

exports.queryParamsArrayConnection = (QUERY, ...PARAMS) => {
    return new Promise(function(resolve, reject) {
        con.query(
            `${QUERY}`, ...PARAMS,
            function(err, rows) {
                if (rows === undefined) {
                    reject(new ErrorResponse(`Error : ${err}`, 400));
                } else {
                    resolve(rows);
                }
            }
        )
    })
}