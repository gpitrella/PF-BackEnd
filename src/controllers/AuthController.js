const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

const image = "https://res.cloudinary.com/techmarket/image/upload/v1657452330/rwbzsixizmehnudxgtg0.gif"

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const API_KEY = process.env.SENDGRID_API_KEY
sgMail.setApiKey(API_KEY)

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
                    res.status(405).json({ msg: "The user is BANNED FOR LIFE" })
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
        }).then(async user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            try{
                const msg={
                  to: req.body.email,
                  from: "techmarketpf@gmail.com",
                  subject:"Successful Registration",
                  text:"Welcome, you have successfully registered",
                  html:`<h1>Welcome ${req.body.name} to Techmarket</h1><img src=${image} alt="" />`
                }
                await sgMail.send(msg);
                }catch(error){
                  console.log(error)
              }
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