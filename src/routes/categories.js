const { Router } = require('express');
const { createCategory, getAllCategories, filterCategories } = require('../controllers/categories');
const router = Router();

router.get('/', async(req,res)=>{
    try{
        let {category} = req.body;
        if(!category) res.status(201).json(await getAllCategories())
        res.status(201).json(await filterCategories(category))
        
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