const express = require("express");
const router = express.Router();

const {
  generateSummary,
  improveText,
} = require("../controllers/aiController");

router.post("/summary", generateSummary);
router.post("/improve", improveText);

module.exports = router;