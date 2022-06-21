const { Router } = require('express');
const { createCategory, getAllCategories } = require('../controllers/categories');
const router = Router();

router.get('/', async(req,res)=>{
    try{
        res.json(await getAllCategories())
    }catch(error){
        res.json(error.message)
    }
})

router.post('/', async(req,res)=>{
    try{
        let {name}=req.body;
        let newCategory = await createCategory(name) 
        res.json(newCategory)
    }catch(error){
        res.json(error.message)
    }
})

module.exports = router;