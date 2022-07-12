const { Router } = require('express');
const { recoverPassword, updatePassword } = require('../controllers/password');
const router = Router();

router.post('/', async(req,res)=>{
    try{
        let { email  } = req.body
        res.json(await recoverPassword(email))
    }catch(error){
        res.json(error.message)
    }
})

router.put('/', async(req,res)=>{
    try{
        let { password, token } = req.body
        res.json(await updatePassword(password, token))
    }catch(error){
        res.json(error.message)
    }
})
module.exports = router;