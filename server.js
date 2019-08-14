
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const authCheckMiddleware = require('./src/routes/verify-jwt');




const apiRoutes = require('./routes/api');

const app = express();
//apply CORS policy
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', authCheckMiddleware)

app.use('/api', apiRoutes);
app.listen(4000, () => console.log("Connected"))
