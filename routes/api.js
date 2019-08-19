const express = require('express');
const router = new express.Router;
const pool = require('./db').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const saltRounds = 10;
const uuid = require('uuid/v4')

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
    var {username, password} = req.body
    username = username.trim()
    pool.query('SELECT id, password FROM user_credentials WHERE username = ? OR email = ?', [username, username], (errors, results, fields)=>{
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
                        let token = jwt.sign({username, id: results[0].id}, process.env.TOKEN_KEY)
                        return res.json({
                            success: true,
                            err: null,
                            token
                        })
                    }else{
                        return res.json({
                            success: false,
                            err: "Wrong password",
                            token: null
                        })
                    }
                })
            }else{
                return res.json({
                    success: false,
                    err: "No results",
                    token: null
                })
            }
        }
    })
})

//user profile info
router.get('/get-user-info', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    return jwt.verify(token,process.env.TOKEN_KEY,(err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        //console.log(user_id)
        pool.query('SELECT user_info.*, user_credentials.username, user_credentials.email, user_credentials.phone FROM user_info, user_credentials WHERE user_credentials.id = ? AND user_info.id = ?', [user_id, user_id], (errors, results, fields)=>{
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
    const token = req.headers.authorization.split(' ')[1]
    const {username, email, phone, first, last, gender, birthday} = req.body
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const oldUsername = decoded.username;
        const user_id = decoded.id;
        pool.query('UPDATE user_info SET firstname = ?, lastname = ?, gender = ?, dateofbirth = ? WHERE id = ?', [first.trim(), last.trim(), gender.trim(), birthday.trim(), user_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }else{
                pool.query('UPDATE user_credentials SET username = ?, email = ?, phone = ? WHERE id = ?', [username.trim(), email.trim(), phone.trim(), user_id], (errors, results, fields)=>{
                    if(errors){
                        console.log(errors)
                        return res.json({
                            success: false,
                            err: errors
                        })
                    }else{
                        if(oldUsername !== username.trim() && oldUsername !== email.trim()){
                            let newToken = jwt.sign({username: username.trim(), id: user_id}, process.env.TOKEN_KEY)
                            return res.json({
                                success: true,
                                err: null,
                                token: newToken
                            })
                        }else{
                            return res.json({
                                success: true,
                                err: null,
                                token: null
                            })
                        }
                    }
                })
            }
        })
    })
   
})
//rating
router.post('/post-personal-rating', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {rating, reasons, public} = req.body;
    const timestamp = moment().format();
    
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        pool.query('SELECT * FROM personal_rating WHERE user_id = ? AND DATE(timestamp) = DATE(NOW())', [user_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }else{
                if(results.length > 0){
                    return res.json({
                        success: false,
                        err: "Only one post day, please choose edit instead"
                    })
                }else{
                    pool.query('INSERT INTO personal_rating (user_id, rating, reasons, timestamp, public, edited) VALUES (?,?,?,?,?, 0)', [user_id, rating, reasons, timestamp, public], (errors, results, fields)=>{
                        if(errors){
                            console.log(errors)
                            return res.json({
                                success: false,
                                err: errors
                            })
                        }else{
                            const post_id = results.insertId
                            
                            // if(public === '1'){
                            //     pool.query('INSERT INTO public_rating (post_id) VALUES (?)',[post_id], (errors, results, fields)=>{
                            //         if(errors){
                            //             console.log(errors)
                            //             return res.json({
                            //                 success: false,
                            //                 err: errors
                            //             })
                            //         }
                            //     })
                            // }
                            return res.json({
                                success: true,
                                data: results,
                                err: null
                            })
                        }
                    })
                }
            }
        })
        
    })
})
router.patch('/edit-personal-rating', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {rating, reasons, public, post_id} = req.body;
    const timestamp = moment().format();
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id
        pool.query('UPDATE personal_rating SET rating = ?, reasons = ?, public = ?, edited = 1 WHERE id = ? AND user_id = ?', [rating, reasons, public, post_id, user_id], (errors, results, fields)=>{
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
    const token = req.headers.authorization.split(' ')[1]
    const month = req.headers.month
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        pool.query('SELECT * FROM personal_rating WHERE user_id = ? AND month(timestamp) = ?', [user_id. month], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
    })

})
router.get('/get-public-rating',(req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const post_id =  req.headers.postid
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        pool.query('SELECT * FROM public-rating WHERE post_id = ?', [post_id], (errors, results, fields)=>{
            if(errors){
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
    })

})
router.post('/post-friend-rating', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {post_id, rating, comment} = req.body
    return jwt.verify(token, process.env.TOKEN_KEY, (err,decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id
        pool.query('INSERT INTO public_rating (post_id,friend_id, friend_rating, comment) VALUES (?,?,?,?)', [post_id, user_id, rating, comment], (errors, results, fields)=>{
            if(errors){
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
    })
})

router.patch('/edit-friend-rating', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {post_id, rating, comment} = req.body
    return jwt.verify(token, process.env.TOKEN_KEY, (err,decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id
        pool.query('UPDATE public_rating SET friend_rating = ?, comment = ? WHERE post_id = ? AND friend_id = ?', [rating, comment, post_id, user_id], (errors, results, fields)=>{
            if(errors){
                return res.json({
                    success: false,
                    err: results
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
    
    })

})
router.get('/get-public-list', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id
        pool.query('SELECT friend_id FROM friendship WHERE user_id = ? AND status = 3', [user_id], (errors, results, fields)=>{
            if(errors){
                return res.json({
                    success: false,
                    err: results
                })
            }
            if(results == undefined || results.length <= 0){
                return res.json({
                    success: false,
                    err: "Connect to some friends to see thier day"
                })
            }
            var tup = ""
            for(var i=0;i<results.length-1; i++){
                tup+=results[i].friend_id+","
            }
            tup += results[results.length-1].friend_id
            console.log(tup)
            pool.query('SELECT * FROM personal_rating WHERE user_id IN ('+tup+')', (errors, results, fields)=>{
                if(errors){
                    return res.json({
                        success: false,
                        err: results
                    })
                }
                
                return res.json({
                    success: true,
                    err: null,
                    data: results
                })
            })
            
        })
    })
})
//friend list
// 0 = pending-sent
// 1 = pending-receive
// 2 = decline
// 3 = accept
//didnt test any of these

router.get('/get-friend-list', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        pool.query('SELECT friend_id FROM friendship WHERE user_id = ? AND status = 3', [user_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors,
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
    })
})
router.get('/get-pending-list', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id;
        console.log(user_id)
        pool.query('SELECT uuid, friend_id FROM friendship WHERE user_id = ? AND status = 1', [user_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
    })
})
router.get('/search-user', (req,res)=>{
    const query = req.headers.query;
    const name = query.split(' ');
    var first, last
    if(name.length > 1){
        first = name[0]
        last = name[1]
    }else{
        first = query
        last = query
    }
    pool.query("SELECT user_credentials.id, user_credentials.username, user_info.firstname, user_info.lastname FROM user_credentials INNER JOIN user_info ON user_credentials.id = user_info.id WHERE user_credentials.username LIKE ? OR user_credentials.email LIKE ? OR user_info.firstname LIKE ? OR user_info.lastname LIKE ?", ['%'+query+'%','%'+query+'%','%'+first+'%','%'+last+'%' ], (errors, results, fields)=>{
        if(errors){
            console.log(errors)
            return res.json({
                success: false,
                err: errors
            })
        }
        return res.json({
            success: true,
            err: null,
            data: results
        })
    })
})
router.get('/get-person-info', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const person_id = req.headers.personid
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err)
            return res.status(401).end()
        pool.query("SELECT user_credentials.id, user_credentials.username, user_info.firstname, user_info.lastname FROM user_credentials INNER JOIN user_info ON user_credentials.id = user_info.id WHERE user_credentials.id = ?", [person_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: results
            })
        })
        
    })
    
})
router.post('/friend-request', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const friend_id = req.headers.friendid;
    const relation_id = uuid();
    return jwt.verify(token, process.env.TOKEN_KEY, (err,decoded)=>{
        if(err){
            return res.status(401).end()
        }
        const user_id = decoded.id
        pool.query('SELECT uuid FROM friendship WHERE user_id = ? AND friend_id = ?', [user_id, friend_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            if(results.length > 0){
                return res.json({
                    success: false,
                    err: "A relationship has already been established"
                })
            }else{
                pool.query('INSERT INTO friendship (uuid,user_id, friend_id, status) VALUES (?,?,?,0)', [relation_id, user_id, friend_id], (errors, results, fields)=>{
                    if(errors){
                        console.log(errors)
                        return res.json({
                            success: false,
                            err: errors
                        })
                    }
                   
                    pool.query('INSERT INTO friendship (uuid,user_id, friend_id, status) VALUES (?,?,?,1)', [relation_id,friend_id, user_id], (errors, results, fields)=>{
                        if(errors){
                            console.log(errors)
                            return res.json({
                                success: false,
                                err: errors
                            })
                        }
                        return res.json({
                            success: true,
                            err: null,
                            data: results
                        })
                    })
                })
            }
        })
        
    })

})
router.patch('/request-response', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const relation_id = req.body.relationid
    const response = req.body.response
    
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        if(response == 2){
            pool.query('DELETE FROM friendship WHERE uuid = ?', [relation_id], (errors, results, fields)=>{
                if(errors){
                    console.log(errors)
                    return res.json({
                        success: false,
                        err: errors
                    })
                }
                return res.json({
                    success: false,
                    err: null,
                    data: "You have politely rejected this person"
                })
            })
            return;
        }
        pool.query('UPDATE friendship SET status = ? WHERE uuid = ?', [response, relation_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: "You guys are friend now"
            })
        })
    })

})

router.delete('/remove-friend', (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const relation_id = req.body.relationid
    return jwt.verify(token, process.env.TOKEN_KEY, (err, decoded)=>{
        if(err){
            return res.status(401).end()
        }
        pool.query('DELETE FROM friendship WHERE uuid = ?', [relation_id], (errors, results, fields)=>{
            if(errors){
                console.log(errors)
                return res.json({
                    success: false,
                    err: errors
                })
            }
            return res.json({
                success: true,
                err: null,
                data: "You have sucessfully removed this person"
            })
        })
    })
})
module.exports = router;