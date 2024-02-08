const express = require('express')
const con = require('../db-config')
const bcrypt = require('bcrypt')
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('userLogin');
});

router.post('/', (req, res)=>{
    let items = 0;
    const {email, password} = req.body;
    if (email && password) {
        con.query("SELECT * FROM users WHERE email = ? " , [email], (error, result)=>{
            if(error) throw error;
            if (result.length>0) {
                bcrypt.compare(password, result[0].password, (err, isTrue)=>{
                    if(req.body.email == result[0].email && isTrue ){
                        con.query("SELECT order_qty from cart where user_id = '"+result[0].user_id+"'",(err, data)=>{
                            if(err)throw err;
                            if(data.length > 0){
                                for (let i = 0; i < data.length; i++) {
                                    // console.log(data[i].order_qty);
                                    items = items + data[i].order_qty;    
                                }
                            }
                            req.session.loggedIn = true; 
                            req.session.type = 'user';
                            req.session.userid = result[0].user_id;
                            req.session.username = result[0].user_name;
                            req.session.isAuth = {
                                user : req.session.userid,
                                name : req.session.username,
                                cartItem : items
                            }; 
                        
                        res.redirect('user');
                        })
                        
                    }
                    else{
                        req.session.message = {
                            type : 'warning',
                            message : 'Invalid Password !'
                        }
                        res.redirect('userLogin');
                    }
                });
            }
            else{
                req.session.message = {
                    type : 'warning',
                    message : 'Invalid Username !'
                }
                res.redirect('userLogin');
            }
        });
        
    } else {
        req.session.message = {
            type : 'danger',
            message : 'Fields cannot be left empty!'
        }
        res.redirect('userLogin');
    }
});


module.exports = router;