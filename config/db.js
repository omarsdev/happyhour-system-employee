const {con} = require("mysql");

const con = mysql.createConnection({
  connectionLimit: 10,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "happy_hour",
});

con.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Not connected");
  }
});

module.exports = con