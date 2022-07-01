const { Router } = require('express');
const { createUsAddress, getAddress, deletAddress } = require('../controllers/useraddress');
const router = Router();

router.post('/:id', async(req,res)=>{
    try {
        let data = req.body
        let {id} = req.params
        res.json(await createUsAddress(id,data))
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
})

router.get('/',async(req,res)=>{
    try {
        res.json(await getAddress())
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
})

router.delete('/', async(req,res)=>{
    try {
        let {id} = req.body;
        res.json(await deletAddress(id))
    } catch (error) {
        res.json(error.message)
    }
})
module.exports = router