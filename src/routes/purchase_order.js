const { Router } = require('express');
const { postPurchase_order, getAllOrders, updateStatus, usersOrders, countAllOrders, sumAllOrders, sumAllToday, sumLastWeek, sumLastMonth, sumBeforeLastMonth, sumLastThreeMonth, getOrdersToday, getOrderDetails, sendMail } = require('../controllers/purchase_order');
const router = Router();


router.get('/', async(req,res)=>{
    try {
        res.json(await getAllOrders())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/users/:id', async (req, res)=>{
    try{
        let { id } = req.params
        res.json( await usersOrders(id))
    }catch(error){
        res.json(error.message)
    }
})

// Agregar para buscar una orden por id.
router.get('/details/:id', async (req, res)=>{
    try{
        let { id } = req.params
        res.json( await getOrderDetails(id))
    }catch(error){
        res.status(404).json({ error: true, msg: error.message });
    }
})

router.put('/', async(req, res)=>{
    try {
        let { id, status } = req.body
        res.json(await updateStatus(id, status))
    } catch (error) {
        res.status(404).json(error.message)
    }
})

router.post('/', async(req, res)=>{
    try {
        let { id, status } = req.body
        res.json(await sendMail(id, status))
    } catch (error) {
        res.status(404).json(error.message)
    }
})

router.get('/count', async(req,res)=>{
    try {
        res.json(await countAllOrders())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/sum', async(req,res)=>{
    try {
        res.json(await sumAllOrders())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/sumtoday', async(req,res)=>{
    try {
        res.json(await sumAllToday())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/sumlastweek', async(req,res)=>{
    try {
        res.json(await sumLastWeek())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/sumlastmonth', async(req,res)=>{
    try {
        res.json(await sumLastMonth())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/sumbeforelastmonth', async(req,res)=>{
    try {
        res.json(await sumBeforeLastMonth())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/sumlastthreemonth', async(req,res)=>{
    try {
        res.json(await sumLastThreeMonth())
    } catch (error) {
        res.json(error.message)
    }
})

router.get('/today', async(req,res)=>{
    try {
        res.json(await getOrdersToday())
    } catch (error) {
        res.json(error.message)
    }
})

module.exports=router;