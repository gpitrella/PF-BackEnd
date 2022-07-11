const { Router } = require("express");
const  {getTokenMaps } = require("../controllers/branchOffice.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
      res.status(200).send(await getTokenMaps());
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

  module.exports = router;
