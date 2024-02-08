const express = require('express')
const router = express.Router();
const con = require('../db-config');

router.get('/',(req, res)=>{
    console.log('Products rendered');
    con.query("SELECT * from product where category = 'insecticide';",(err, data)=>{
        res.render('products',{data});
    });
}); 
router.get('/insecticide',(req, res)=>{
    console.log('Products/insecticide rendered');
    con.query("SELECT * from product where category = 'insecticide';",(err, data)=>{
        res.render('products',{data});
    });
}); 
router.get('/cattle-and-bird-care',(req, res)=>{
    console.log('Products/cabc rendered');
    con.query("SELECT * from product where category = 'cattleAndBirdCare';",(err, data)=>{
        res.render('products',{data});
    });
});
router.get('/gardening',(req, res)=>{
    console.log('Products/gardening rendered');
    con.query("SELECT * from product where category = 'gardening';",(err, data)=>{
        res.render('products',{data});
    });
});

router.post('/insecticide', (req, res)=>{
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
                        res.redirect('/products/insecticide')
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
                            res.redirect('/products/insecticide');
                        })
                    }
                })
            }
            else{
                    req.session.message = {
                    type : 'warning',
                    message : 'You must Login to continue !'
                }
                res.redirect('/userLogin');

            }
        }   
    });
});

router.post('/cattleAndBirdCare', (req, res)=>{
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
                        res.redirect('/products/cattleAndBirdCare')
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
                            res.redirect('/products/cattleAndBirdCare');
                        })
                    }
                })
            }
            else{
                    req.session.message = {
                    type : 'warning',
                    message : 'You must Login to continue !'
                }
                res.redirect('/userLogin');

            }
        }   
    });
});

router.post('/gardening', (req, res)=>{
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
                        res.redirect('/products/gardening')
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
                            res.redirect('/products/gardening');
                        })
                    }
                })
            }
            else{
                    req.session.message = {
                    type : 'warning',
                    message : 'You must Login to continue !'
                }
                res.redirect('/userLogin');

            }
        }   
    });
});

module.exports = router;