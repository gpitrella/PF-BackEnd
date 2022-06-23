const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
// const { API_KEY } = process.env;
const { createProduct, getAllProduct, getByName, getById, deleteProduct, changeProduct , getAllPaginatedProduct} = require('../controllers/product.js');


const router = Router();

router.get('/', async(req, res)=>{
    try{
        const {all , name} = req.query
        res.json( all ? 
        name ? await getByName(name) :
        await getAllProduct() : async() => {
        const pageAsNumber = Number.parseInt(req.query.page);
        const sizeAsNumber = Number.parseInt(req.query.size);
        const {category, manufacturer, min, max, order} = req.query
        await getAllPaginatedProduct(pageAsNumber,sizeAsNumber, name, category, manufacturer, min, max, order)})
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.post('/', async (req, res)=>{
    try{
        let data = req.body
        res.status(200).json(await createProduct(data))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/:id', async(req,res)=>{
    try{
        let { id } = req.params;
        res.json(await getById(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        let { id } = req.params;
        res.json(await deleteProduct(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        let { id } = req.params
        let data = req.body
        res.json(await changeProduct(id, data))
    }catch(error){
        res.status(404).json(error.message)
    }
})

module.exports = router;