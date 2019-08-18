
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authCheckMiddleware = require('./routes/verify-jwt');




const apiRoutes = require('./routes/api');

const app = express();
//apply CORS policy
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', authCheckMiddleware)

app.use('/', apiRoutes);
app.listen(4000, () => console.log("Connected"))
