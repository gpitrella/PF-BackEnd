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
    const branchOffices = (lat || long) ? await getNearestbranchOffice(lat, long) : await getAllbranchOffices()
    res.status(200).send(branchOffices);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body
    res.status(201).send(await createBranchOffice(data));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params
    res.status(200).send(await getByIdBranchOffice(id));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
        const {id} = req.params
        const data = req.body
    res.status(200).send(await updateBranchOffice(id, data));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params
    res.status(200).send(await deleteBranchOffice(id));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
