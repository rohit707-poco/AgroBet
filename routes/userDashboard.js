const express = require('express')
const router = express.Router();
const con = require('../db-config')

router.get('/',(req, res)=>{
    let items = 0 ;
    con.query('SELECT * FROM users where user_id = "'+req.session.userid+'"', (err,result)=>{
        if(err) throw err;

        con.query("SELECT order_qty from cart where user_id = '"+result[0].user_id+"'",(err, data)=>{
            if(err)throw err;
            if(data.length > 0){
                for (let i = 0; i < data.length; i++) {
                    // console.log(data[i].order_qty);
                    items = items + data[i].order_qty;    
                }
            }
            req.session.isAuth = {
                user : req.session.userid ,
                name : req.session.username ,
                cartItem : items
            }; 
            console.log('userDashboard rendered');
            res.redirect('userDashboard', {result});
        });
    });
});
module.exports = router;