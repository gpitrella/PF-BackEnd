const { Router } = require('express');
const { getAllManufacturer, createManufacturer } = require('../controllers/manufacturer');

const router = Router();

router.get('/', async(req,res)=>{
    try{
        res.json(await getAllManufacturer())
    }catch(error){
        res.json(error.message)
    }
})

router.post('/', async(req,res)=>{
    try{
        let {name}=req.body;
        let newManufacturer = await createManufacturer(name) 
        res.json(newManufacturer)
    }catch(error){
        res.json(error.message)
    }
})

module.exports = router;