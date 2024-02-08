const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const con = require('../db-config');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const { email, name, address, mobileNo, password, conPassword } = req.body;
    if (!(email == '' || name == '' || address == '' || mobileNo == '')) {
        con.query("SELECT * from users where email = '" + email + "'", (error, data) => {
            if (data.length > 0) {
                req.session.message = {
                    type: "danger",
                    message: "This Email is already registered"
                }
                res.redirect('register');
            }
            else {
                if (password === conPassword) {
                    const userId = Date.now().toString();
                    bcrypt.hash(password, 8, (error, hash) => {
                        if (error) throw error;
                        const hashPassword = hash;
                        const values = [
                            [userId, name, email, address, mobileNo, hashPassword]
                        ];
                        console.log(values);
                        const qry = "INSERT into users (user_id, user_name, email, address, mobile_no, password) VALUES ?;"
                        con.query(qry, [values], (err, result) => {
                            if (err) throw err;
                            req.session.message = {
                                type: 'success',
                                message: 'User created successfully !'
                            }
                            res.redirect('/');
                        })
                    });

                }
                else {
                    req.session.message = {
                        type: 'warning',
                        message: 'Passwords do not match'
                    }
                    res.redirect('register');
                }
            }
        })
    }
    else {
        req.session.message = {
            type: 'danger',
            message: 'Some fields are left empty !!!'
        }
        res.redirect('register');
    }

});





module.exports = router;