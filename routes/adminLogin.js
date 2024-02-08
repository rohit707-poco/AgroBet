const express = require('express')
const router = express.Router();
const con = require('../db-config');


router.get('/',(req, res)=>{
    res.render('adminLogin');

});


router.post('/', (req, res)=>{
    const {adminId, password}= req.body;
    if(adminId && password){
        qry=  "SELECT * FROM admin where adminid = '"+adminId+"' ;"
        con.query(qry, (error, data)=>{
            if(error) throw error;
            if(data.length>0){
                if(password == data[0].password){

                    req.session.loggedIn = true;
                    console.log(data[0]);
                    req.session.type = 'admin';
                    req.session.userid = data[0].adminId;
                    const name = data[0].adminName;
                    const id = req.session.userid;
                    req.session.message ={
                        type : 'success',
                        message : `Welcome ${data[0].adminName}`,
                    }
                    res.redirect('adminDashboard');
                }
                else{
                    req.session.message ={
                        type : 'warning',
                        message : 'Invalid Username/Password'
                    }
                    res.redirect('adminLogin');
                }
            }
            else{
                req.session.message ={
                    type : 'warning',
                    message : 'Invalid Username/Password'
                }
                res.redirect('adminLogin');
            }
        })
    }
    else{
        req.session.message ={
            type : 'danger',
            message: 'Some fields may be left empty!!!'
        }
        res.redirect('adminLogin');
    }
});

module.exports = router;