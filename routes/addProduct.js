const express = require('express');
const multer = require('multer');
const con = require('../db-config')
const router = express.Router();

const multerStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, 'public/img/publications')
    },
    filename : (req, file, cb)=>{
       const ext = file.mimetype.split('/')[1];
       cb(null, `${file.originalname.split('.')[0]}.${ext}`);
    }
});

const upload = multer({
    storage : multerStorage
    // we can also add a filter  to let only a certain type of file to uploaded
})
router.get('/', (req, res)=>{
    res.render('addProduct'); 
});

router.post('/', upload.single('productImage'), (req, res)=>{
    const {productName, productPrice, productId, category, productQuantity, productDetail} = req.body;
    const productImage = req.file.filename;
    qry = 'INSERT INTO product VALUES ?;'
    values = [
        [productId, productName, productImage, productPrice, productDetail, productQuantity, category]
    ]
    con.query(qry, [values], (err , data)=>{
        if (err) throw err;
        req.session.message = {
            type : "success",
            message : "Product added Sucessfully !!!"
        }
        res.redirect('addProduct')
    })

});
module.exports = router;