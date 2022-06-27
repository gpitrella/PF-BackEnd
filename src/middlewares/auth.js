const { User } = require('../db');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');
//const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {

    // Comprobar que existe el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Access Denied" });
    } else {

        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];

        // Comprobar la validez de este token
        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if(err) {
                res.status(500).json({ msg: "There was a problem decoding the token", err });
            } else {
                
                User.findByPk(decoded.user.id, { include: "roles" }).then(user => {

                    console.log(user.roles);

                    req.user = user;
                    next();
                });
            }

        })
    }

};