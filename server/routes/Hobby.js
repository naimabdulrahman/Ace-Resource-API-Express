const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/HobbyController");

router.get("/listHobby", (req, res) => {
  controller.listHobby(req, res);
});

router.post("/createHobby", (req, res) => {
  controller.createHobby(req, res);
});

router.post("/updateHobby", (req, res) => {
  controller.updateHobby(req, res);
});

router.delete("/deleteHobby", (req, res) => {
  controller.deleteHobby(req, res);
});

module.exports = router;
