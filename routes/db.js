const mysql = require('mysql');
var pool;

//Production or development mode
var mode = process.env.NODE_ENV;
//console.log(mode);

if (mode == 'production') {
	// //database connection 
	// console.log('production');
	// pool = mysql.createPool({
	//     host: 'grandopenings.c1z3kncyvtzj.us-east-1.rds.amazonaws.com',
	//     port: '3306',
	//     user: 'grands_co',
	//     password: 'Grandopenings.co123!!!',
	//     database: 'ratemyday'
	// });
} else {
	//database connection 
	console.log('development');
	pool = mysql.createPool({
	    host: 'localhost',
	    // port: '3306',
	    user: 'root',
	    password: '',
	    database: 'ratemyday'
	});
}
exports.pool = pool