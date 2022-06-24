const { Router } = require('express');
const { getAllManufacturer, createManufacturer, deleteManufacturer } = require('../controllers/manufacturer');

const router = Router();

router.get('/', async(req,res)=>{
    try{
        res.json(await getAllManufacturer())
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.post('/', async(req,res)=>{
    try{
        let {name, image}=req.body;
        res.json(await createManufacturer(name, image))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        res.json(await deleteManufacturer(id))
    } catch (error) {
        res.json(error)
    }
})
module.exports = router;