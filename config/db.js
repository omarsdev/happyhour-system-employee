const {con} = require("mysql");

const con = mysql.createConnection({
<<<<<<< HEAD
    connectionLimit: 10,
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "happy_hour",
=======
  connectionLimit: 10,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "happy_hour",
>>>>>>> 52e97ddf2e5df93f80fe406a74081f0820ce0e3d
});

/* function Query(query) {
  pool.getConnection(function(err, connection) {
    const 
  });
} */
/* pool.getConnection(function(err, connection) {
  
}); */

// function makrNewConnection(uri) {
//   const db = mongoose.createConnection(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   });

con.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Not connected");
    }
});

module.exports = con