const express = require("express");
const { getDashboardStats } = require("../controllers/adminController");
const router = express.Router();

const {protect , isAdmin } = require('../middlewares/authMiddleware');

// Route to get dashboard metrics
router.get("/dashboard-stats", protect, isAdmin, getDashboardStats);

module.exports = router;
