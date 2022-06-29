const { Router } = require('express');
const axios = require("axios");
const { createPayment } = require('../controllers/payment');
require('dotenv').config();

const router = Router();

//deberia ser un Post...  
  router.post("/", async  function (req, res, next) {
    let data=req.body

    try {
      const payment = await createPayment(data);
  
      return res.json(payment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
    }
});
  module.exports=router