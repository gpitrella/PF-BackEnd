const { Router } = require('express');
const { createCategory, getAllCategories, deleteCategory } = require('../controllers/categories');
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

router.delete('/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        res.json(await deleteCategory(id))
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;