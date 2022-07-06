const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');

let loginWithGoogle = async function(profile) {
  let userFound = await User.findOne({ where: { email: profile.emails[0].value } });
  let userToReturn = !userFound ? await createUserWithGoogleProfile(profile) : { ...userFound.dataValues };
  return userWithToken(userToReturn);
}

let createUserWithGoogleProfile = async function(profile) {
  //console.log('Debo crear un usuario...');
  let password = bcrypt.hashSync('123456', Number.parseInt(authConfig.rounds));
  let newUser = await User.create({
    name: profile.name.givenName,
    email: profile.emails[0].value,
    password: password,
    image: profile.photos[0].value,
  });
  return newUser;
}

let userWithToken = function(user) {
  let token = jwt.sign({ user: user }, authConfig.secret, { expiresIn: authConfig.expires });
  return {
    user: user,
    token: token
  }
}

module.exports = loginWithGoogle;