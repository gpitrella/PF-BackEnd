const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
// const { API_KEY } = process.env;
const { Product } = require('../../src/db.js')

const router = Router();

router.get('/', async (req, res, next)=>{
    try{
        const { name } = req.body;
        if(name){ 
            Product.create({
                name: name
            })
            const dataProduct = await Product.findAll()
            console.log(dataProduct)
            res.status(200).json(dataProduct);
        } else {
            res.status(200).send('Data should be necesary'); 
        } 
    } catch (error){
        next(error)
    }
})

module.exports = router;