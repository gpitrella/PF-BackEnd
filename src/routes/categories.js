const { Router } = require('express');
const { createCategory, getAllCategories } = require('../controllers/categories');
const router = Router();

router.get('/', async(req,res)=>{
    try{
        res.status(201).json(await getAllCategories()) 
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.post('/', async(req,res)=>{
    try{
        let {name} = req.body
        res.json(await createCategory(name))
    }catch(error){
        res.status(404).json(error.message)
    }
})

module.exports = router;