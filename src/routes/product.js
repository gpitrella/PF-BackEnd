const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
// const { API_KEY } = process.env;
const { Product } = require('../../src/db.js');
const { createProduct, getAllProduct } = require('../controllers/product.js');

const router = Router();
//No esta funcional...
router.get('/', async(req, res)=>{
    try{
        res.json(await getAllProduct())
    }catch(error){
        res.json(error.message)
    }
})
router.post('/', async (req, res)=>{
    let {name,price,discount,stock,description,category,manufacturer,image} = req.body
    try{
            let newProduct = await createProduct(name,price,discount,stock,description,category,manufacturer,image) 
            res.status(200).json(newProduct);
        }
    catch(error){
        res.json(error.message)
    }
})

module.exports = router;