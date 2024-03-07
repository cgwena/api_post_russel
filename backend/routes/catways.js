const express = require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catways')
const reservationCtrl = require('../controllers/reservations')
const auth = require('../middlewares/auth')

router.get('/reservations', reservationCtrl.getAllReservations)
router.get('/reservations/:idReservation', reservationCtrl.getOneReservation);

router.post('/', auth, catwayCtrl.createCatway);
router.get('/', auth, catwayCtrl.readAllCatways);
router.get('/:id', auth, catwayCtrl.readOneCatway);
router.put('/:id', auth, catwayCtrl.updateCatway);
router.delete('/:id', auth, catwayCtrl.deleteCatway);


router.post('/:id/reservations', auth, reservationCtrl.createReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationCtrl.deleteReservation);



module.exports = router;