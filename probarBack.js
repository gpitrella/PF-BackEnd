const axios = require("axios");

const producto = async (name) => {
    console.log(name)
  await axios
    .post("http://localhost:3001/product/", name)
    .then((response) => console.log(response.data))
    .catch((e) => console.log(e.code));
};


producto({name :"lapicera"})