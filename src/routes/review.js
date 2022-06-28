const { Router } = require('express');
const axios = require("axios");

const { createReview } = require('../controllers/review.js');

const router = Router();

router.post('/', async(req, res)=>{
    try{
        const {comment,score, id} = req.body
        res.status(200).send(await createReview(comment,score, id))
    }catch(error){
        res.status(404).json(error.message)
    }
})

module.exports = router;