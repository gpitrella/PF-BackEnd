const router = require("express").Router();
const passport = require("passport");

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const CLIENT_URL = process.env.CLIENT_URL;

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
  else {
    res.status(401).json({
      error: true,
      message: "Error on authentication"
    })
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  if (req.logout) req.logout();
  res.status(201).json({
    success: true
  })
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router