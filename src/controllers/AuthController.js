const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

module.exports = {

    //? Login
    signIn(req, res) {

        let { email, password } = req.body;

        // Buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {

            if (!user) {
                res.status(404).json({ msg: "User with this email not found" });
            } else {
                if(user.isactive ==  false) {
                    res.status(404).json({ msg: "The user is BANNED FOR LIFE" })
                } else {
                if (bcrypt.compareSync(password, user.password)) {

                    // Creamos el token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {

                    // Unauthorized Access
                    res.status(401).json({ msg: "Incorrect password" })
                }

            }
        }
        }).catch(err => {
            res.status(500).json(err);
        })

    },

    //? Registro
    async signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Crear un usuario
        let findUser = await User.findAll({
            where: {
                email: req.body.email
            }
        })
        if (findUser.length === 0){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });
        } else {
            res.status(404).json({ msg: "Email already used" });
        }
    }
}