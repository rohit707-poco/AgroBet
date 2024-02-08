const express = require('express')
const router = express.Router();
const con = require('../db-config');
router.get('/',(req, res)=>{
    con.query("SELECT * from product where category = 'insecticide';",(err, data)=>{
        res.render('products',{data});
    });
}); 
router.post('/', (req, res)=>{
    const product = req.body.productId;    
    const userid = req.session.userid;
    const qry = "SELECT product_id FROM product WHERE product_id = '"+product+"'";
    con.query(qry, (error, data)=>{
        if(error) throw error;
        if(data.length >0){
            if(req.session.userid){
                con.query("SELECT * FROM cart where product_id = '"+product+"' AND user_id = '"+userid+"'", (errr, resu)=>{
                    if(errr) throw errr;
                    if(resu.length>0){
                        req.session.message ={
                            type : 'success',
                            message : 'Item already exist in cart !'
                        };
                        res.redirect('products')
                    }
                    else{
                        const values = [
                            [parseInt(product), userid, 1]
                        ];
                        const cartQry = 'INSERT INTO cart (product_id, user_id ,order_qty) VALUES ?;'
                        con.query(cartQry, [values], (err, result)=>{
                            if(err) throw err;
                            req.session.message ={
                                type : 'success',
                                message : 'Item added to cart successful !'
                            };
                            res.redirect('products');
                        })
                    }
                })
            }
            else{
                    req.session.message = {
                    type : 'warning',
                    message : 'You must Login to continue !'
                }
                res.redirect('userLogin');

            }
        }   
    });
})

module.exports = router;