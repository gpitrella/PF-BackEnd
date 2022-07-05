const { Router } = require('express');
const axios = require("axios");

const  { getUserFavorites, getUserReviews, getUserPurchase_Orders } = require('../controllers/profileUser.js');

const router = Router();

router.get('/', async(req, res)=>{
    try{
        res.status(200).send("basic")
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/favorites/:id', async(req, res)=>{
    try{
        const { id } = req.params
        res.status(200).send(await getUserFavorites(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/reviews/:id', async(req, res)=>{
    try{
        const { id } = req.params
        res.status(200).send(await getUserReviews(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/purchase_Orders/:id', async(req, res)=>{
    try{
        const { id } = req.params
        res.status(200).send(await getUserPurchase_Orders(id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

module.exports = router;