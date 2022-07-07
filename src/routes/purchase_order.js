const { Router } = require('express');
const { postPurchase_order, getAllOrders } = require('../controllers/purchase_order');
const router = Router();

router.post('/', async(req,res)=>{
    let data = req.body;
    try {
        res.json(await postPurchase_order(data))
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/', async(req,res)=>{
    try {
        res.json(await getAllOrders())
    } catch (error) {
        res.json(error.message)
    }
})

module.exports=router;