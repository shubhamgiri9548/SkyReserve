// routes/flightRoutes.js

const express = require('express');
const router = express.Router();

const {
    createFlight,
    getAllFlights,
    getFlightById,
    updateFlight,
    deleteFlight, 
    getAllPublicFlights
} = require('../controllers/flightController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');


router.post('/create', protect, isAdmin, createFlight);
router.get('/getflight', protect, getAllFlights);
router.get('/public', getAllPublicFlights);
router.get('/getflight/:id', getFlightById);
router.put('/update/:id', protect, isAdmin, updateFlight);
router.delete('/delete/:id', protect, isAdmin, deleteFlight);
    
module.exports = router;
