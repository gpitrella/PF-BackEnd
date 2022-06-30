const { Router } = require("express");
const axios = require("axios");

const {
  getNearestbranchOffice,
  getAllbranchOffices,
  createBranchOffice,
  getByIdBranchOffice,
  updateBranchOffice,
  deleteBranchOffice,
} = require("../controllers/branchOffice.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { lat, long } = req.query
    var branchOffices = (lat && long) ? await getNearestbranchOffice(lat, long) : await getAllbranchOffices()
    res.status(200).send(branchOffices);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body
    res.status(200).send(await createBranchOffice(data));
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await getByIdBranchOffice());
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.status(200).send(await updateBranchOffice());
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    res.status(200).send(await deleteBranchOffice());
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
