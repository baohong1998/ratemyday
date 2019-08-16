const jwt = require('jsonwebtoken');
const pool = require('./db').pool
module.exports = (req, res, next)=>{
    if(!req.headers.authorization){
        console.log("Need authorization header")
        next();
    }else{
        const token = req.headers.authorization.split(' ')[1]
        //console.log(token)
        return jwt.verify(token, 'testing',(err, decoded)=>{
            if(err){
                console.log(err)
                return res.status(401).end()
            }
            //console.log(decoded);
            const username = decoded.username
            
            pool.query('SELECT id FROM user_credentials WHERE username = ?', [username.trim()], (error, results, fields)=>{
                if(error || results.length <= 0 || results == undefined){
                    console.log("Unauthorize since no user")
                    return res.status(401).end()
                    
                };
               
                return next();
            })
            
        })
    }
}