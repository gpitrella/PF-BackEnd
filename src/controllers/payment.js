const axios = require("axios");

async function createPayment({email,items}) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: email,
      items,
      back_urls: {
        failure: "http://localhost:3000",
        pending: "http://localhost:3000",
        success: "http://localhost:3000"
      }      
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data.init_point;
  }

module.exports={
    createPayment
}