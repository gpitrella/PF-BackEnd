const { Router } = require('express');
const axios = require("axios");

const { createComment, getAllComments, createAnswer } = require('../controllers/comments.js');

const router = Router();

router.post('/', async(req, res)=>{
    try{ 
        let {comment, idProduct, idUser} = req.body
        res.status(200).json(await createComment(comment, idProduct, idUser))
    }catch(error){
        res.status(404).json(error.message)
    }
})

router.get('/', async(req,res)=>{
    try {
        res.json(await getAllComments())
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/', async(req,res)=>{
    try {
        let{idComment,answer} = req.body
        res.json(await createAnswer(idComment,answer))
    } catch (error) {
        res.json(error.message)
    }
})

module.exports = router;