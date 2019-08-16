const express = require('express');
const router = new express.Router;
const pool = require('./db').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const saltRounds = 10;

//authentication
router.post('/create-account', (req,res)=>{
    const {username, password, email, phone, first, last, gender, birthday} = req.body;
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            pool.query('INSERT INTO user_credentials (username, email, phone, password) VALUES (?,?,?,?)', [username.trim(), email.trim(), phone.trim(), hash], (errors, results, fields)=>{
                if(errors){
                    console.log(errors)
                    return res.json({
                        success: false,
                        err: errors
                    })
                }else{
                    pool.query('INSERT INTO user_info (id, firstname, lastname, gender, dateofbirth) VALUES ((SELECT id FROM user_credentials WHERE username = ?),?,?,?,?)', [username.trim(),first.trim(), last.trim(), gender.trim(), birthday.trim()], (errors, results, fields)=>{
                        if(errors){
                            console.log(errors)
                            return res.json({
                                success: false,
                                err: errors
                            })
                        }else{
                            return res.json({
                                success: true,
                                err: null
                            })
                        }
                    })
                }
            })
        })
    })
})
router.post('/authenticate', (req, res)=>{
    const {username, password} = req.body
    pool.query('SELECT id, password FROM user_credentials WHERE username = ?', [username.trim()], (errors, results, fields)=>{
        if(errors){
            console.log(errors)
            return res.status(401).json({
                success: false,
                err: errors,
                token: null
            })
        }else{
            if(results.length > 0){
                bcrypt.compare(password, results[0].password, (err, response)=>{
                    if(response){
                        let token = jwt.sign({username, id: results[0].id}, 'testing')
                        return res.json({
                            success: true,
                            err: null,
                            token
                        })
                    }
                })
            }
        }
    })
})

//user profile info
router.get('/get-user-info', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    return jwt.verify(token,'testing',(err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        //console.log(user_id)
        pool.query('SELECT * FROM user_info WHERE id = ?', [user_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors,
                    data: null
                })
            }else{
                if(results == undefined || results.length == 0){
                    return res.json({
                        success: false,
                        err: 'No results',
                        data: null
                    })
                }else{
                    return res.json({
                        success: true,
                        err: null,
                        data: results[0]
                    })
                }
            }
        })
    })
})
router.patch('/edit-user-info', (req, res)=>{
    
})
//rating
router.post('/post-personal-rating', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {rating, reasons, public} = req.body;
    const timestamp = moment().format();
    return jwt.verify(token, 'testing', (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        pool.query('INSERT INTO personal_rating (user_id, rating, reasons, timestamp, public, edited) VALUES (?,?,?,?,?, 0)', [user_id, rating, reasons, timestamp, public], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }else{
                const post_id = results.insertId
                
                if(public === '1'){
                    pool.query('INSERT INTO public_rating (id) VALUES (?)',[post_id], (errors, results, fields)=>{
                        if(errors){
                            console.log(errors)
                            return res.json({
                                success: false,
                                err: errors
                            })
                        }
                    })
                }
                return res.json({
                    success: true,
                    data: results,
                    err: null
                })
                
                
            }

        })
    })
})
router.patch('/edit-personal-rating', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {rating, reasons, public, post_id} = req.body;
    const timestamp = moment().format();
    return jwt.verify(token, 'testing', (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id
        pool.query('UPDATE personal_rating SET rating = ?, reasons = ?, public = ?, edited = 1 WHERE post_id = ? AND user_id = ?', [rating, reasons, public, post_id, user_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null
            })
        })
    })
})

router.get('/get-personal-rating', (req, res)=>{

})
router.get('/get-public-rating',(req, res)=>{

})
router.post('/post-friend-rating', (req, res)=>{

})
router.post('/post-friend-comment', (req, res)=>{

})
router.patch('/edit-friend-comment', (req, res)=>{

})
router.get('/public-rating-list', (req, res)=>{

})
//friend list
router.get('/get-friend-list', (req, res)=>{

})
router.post('/friend-request', (req, res)=>{

})
router.patch('/request-response', (req, res)=>{

})
router.delete('/remove-friend', (req, res)=>{
    
})
module.exports = router;