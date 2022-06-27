const { Router } = require('express');
const axios = require("axios");

const { createComment } = require('../controllers/comments.js');

const router = Router();

router.post('/', async(req, res)=>{
    try{
        const {comment, product} = req.body
        console.log(comment, product)
        res.status(200).send(await createComment(comment, product))
    }catch(error){
        res.status(404).json(error.message)
    }
})

module.exports = router;