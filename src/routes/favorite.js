const { Router } = require("express");
const { favoritePost, deleteFavorite } = require("../controllers/favorites");
const router = Router();

router.post('/', async(req,res)=>{
    try {
        let {idUser,idProduct}= req.body;
        console.log(idUser, idProduct);
        res.json(await favoritePost(idUser,idProduct))
    } catch (error) {
        res.json(error.message)
    }
})
router.delete('/', async(req,res)=>{
    try {
        let {id}= req.body;
        res.json(await deleteFavorite(id))
    } catch (error) {
        res.json(error.message)
    }
})
module.exports= router;