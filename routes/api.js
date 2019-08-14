const express = require('express');
const router = new express.Router;
const pool = require('./db').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//authentication
router.post('/create-account', (res,req)=>{

})
router.post('/authenticate', (res, req)=>{

})

//user profile info
router.get('/user-info', (req, res)=>{

})
router.patch('/edit-user-info', (req, res)=>{

})
//rating
router.post('/post-personal-rating', (req, res)=>{

})
router.post('/post-personal-comment', (res, req)=>{

})
router.get('/get-personal-rating', (res, req)=>{

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