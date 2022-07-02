const { Router } = require("express");
const { favoritePost } = require("../controllers/favorites");
const router = Router();

router.post('/', async(req,res)=>{
    try {
        let{idUser,idProduct}= req.body;
        res.json(await favoritePost(idUser,idProduct))
    } catch (error) {
        res.json(error.message)
    }
})
module.exports= router;