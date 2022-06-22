const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
// const { API_KEY } = process.env;
const { createProduct, getAllProduct, getByName, getById, deleteProduct, changeProduct } = require('../controllers/product.js');
const { Product } = require("../db");

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
router.get('/', async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
    }
  
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
    }
  
    const productWithCount = await Product.findAndCountAll({
      limit: size,
      offset: page * size
    });
    res.send({
      content: productWithCount.rows,
      totalPages: Math.ceil(productWithCount.count / Number.parseInt(size))
    });
  })
router.post('/', async (req, res)=>{
    try{
        let data = req.body
        res.status(200).json(await createProduct(data))
        }
    catch(error){
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