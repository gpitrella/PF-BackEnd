const { Router } = require('express');
const { createCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory } = require('../controllers/categories');
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

router.get('/:id', async(req,res)=>{
    try{
        let { id } = req.params
        res.status(201).json(await getCategoryById(id)) 
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        res.json(await deleteCategory(id))
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        let {name} = req.body;
        res.json(await updateCategory(id, name))
    } catch (error) {
        res.json(error.message)
    }
})
module.exports = router;