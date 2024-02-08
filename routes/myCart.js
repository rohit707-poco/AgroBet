const express = require('express')
const router = express.Router();
const con = require('../db-config')
router.get('/',async(req, res)=>{
    console.log('redirected');
    execute(req, res);
});

router.post('/',(req, res)=>{
   
    if(req.body.delete){
        const query = `DELETE from cart WHERE product_id = ${req.body.productId}`
        con.query(query, (err)=>{
            if(err)throw err;
            console.log("delete time");
            execute(req, res);
            res.redirect('myCart')
        });
    } 
    else if(req.body.add){
        const query = `UPDATE cart SET order_qty = ${(parseInt(req.body.qty))+1} WHERE product_id = ${req.body.productId}`
        con.query(query, (err)=>{
            if(err)throw err;  
            console.log("Add time");
            execute(req, res);
            res.redirect('myCart')     
        });
    }  
    else if(req.body.sub){
        const query = `UPDATE cart SET order_qty = ${parseInt((req.body.qty))-1} WHERE product_id = ${req.body.productId}`
        con.query(query, (err)=>{
            if(err)throw err;   
            console.log("sub time");
            execute(req, res);
            res.redirect('myCart')    
        });
    }  
    else if (req.body.order) {
        console.log(req.body);
        console.log("pata nahi time");
        execute(req, res);
        res.redirect('myCart')
    }
    // res.redirect('myCart')
})
    
module.exports = router;


const execute = async(req, res)=>{
    let items = 0;
    let subTotal = 0;
    let gTotal = 0;
    const qry = `SELECT * FROM product INNER JOIN (SELECT * from cart WHERE user_id = ${req.session.userid} )as cart ON product.product_id = cart.product_id; `
     con.query(qry,(err, data)=>{
        try {
            if(data.length > 0){
                for (let i = 0; i < data.length; i++) {
                    items = items + data[i].order_qty;    
                    subTotal = (data[i].order_qty)*(data[i].product_price)
                    gTotal += subTotal;
                }
            }
            req.session.isAuth = {
                user : req.session.userid ,
                name : req.session.username ,
                cartItem : items,
                gTotal : gTotal
            };    
            console.log("First time");
            res.render('myCart',{data});
        } catch (err) {
            res.send("error 404")
            console.log(err);
        } 
    })
}