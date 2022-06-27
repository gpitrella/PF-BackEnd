const { User } = require('../db');

module.exports = {

    show(req,res, next){
        if(req.user.admin) {
            next()
        }else {
            res.status(403).json({msg: 'Access Denied'})
        }
    }
}