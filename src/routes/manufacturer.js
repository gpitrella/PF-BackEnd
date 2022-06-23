const { Router } = require('express');
const { getAllManufacturer, createManufacturer } = require('../controllers/manufacturer');

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

module.exports = router;