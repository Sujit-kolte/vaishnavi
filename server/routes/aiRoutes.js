const express = require("express");
const router = express.Router();

const {
  chat,
  generateSummary,
  improveText,
} = require("../controllers/aiController");

router.post("/chat", chat);
router.post("/summary", generateSummary);
router.post("/improve", improveText);

module.exports = router;
