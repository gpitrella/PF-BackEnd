const { Router } = require('express');
const axios = require("axios");

const { createComment } = require('../controllers/comments.js');

const router = Router();

router.post('/', async(req, res)=>{
    try{ 
        let {comment, idProduc, idUser} = req.body
        res.status(200).json(await createComment(comment, idProduc, idUser))
    }catch(error){
        res.status(404).json(error.message)
    }
})

module.exports = router;