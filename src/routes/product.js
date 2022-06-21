const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
// const { API_KEY } = process.env;
const { createProduct, getAllProduct, getByName, getById, deleteProduct, changeProduct } = require('../controllers/product.js');

const router = Router();

router.get('/', async(req, res)=>{
    try{
        let {name} = req.query
        if(!name){
            res.json(await getAllProduct())
        } else {res.json(await getByName(name))}
    }catch(error){
        res.status(404).json(error.message)
    }
})
router.post('/', async (req, res)=>{
    let {name,price,discount,stock,description,category,manufacturer,image} = req.body
    try{
            let newProduct = await createProduct(name,price,discount,stock,description,category,manufacturer,image) 
            res.status(200).json(newProduct);
        }
    catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    try{
        res.json(await getById(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        res.json(await deleteProduct(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const { id } = req.params
        const data = req.body;
        res.json(await changeProduct(id, data))
    }catch(error){
        res.status(405).json(error.message)
    }
})

module.exports = router;