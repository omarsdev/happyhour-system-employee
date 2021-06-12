const jwt = require("jsonwebtoken");

function jwtGenerator(id) {
    const payload = {
        user: {
            id: id
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    console.log(token);

    return token;
}

module.exports = jwtGenerator;