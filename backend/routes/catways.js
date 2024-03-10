/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - type
 *         - catwayState
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: The number of the catway
 *         type:
 *           type: string
 *           description: the type of the catway (can have only 2 values, short or long)
 *         catwayState:
 *           type: boolean
 *           description: Whether the catway is free or booked
 *         
 *       example:
 *         CatwayNumber: 100
 *         type: short
 *         catwayState: false
 */
/**
 * @swagger
 * tags:
 *   name: Catway
 *   description: The catway managing API
 * /api/catways:
 *   post:
 *     summary: Create a new catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: The created catway.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       500:
 *         description: Some server error
 *
 */

const express = require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catways')
const reservationCtrl = require('../controllers/reservations')
const auth = require('../middlewares/auth')

router.get('/reservations', auth, reservationCtrl.getAllReservations)
router.get('/reservations/:idReservation', auth, reservationCtrl.getOneReservation);

router.post('/', auth, catwayCtrl.createCatway);
router.get('/', auth, catwayCtrl.readAllCatways);
router.get('/:id', auth, catwayCtrl.readOneCatway);
router.put('/:id', auth, catwayCtrl.updateCatway);
router.delete('/:id', auth, catwayCtrl.deleteCatway);


router.post('/:id/reservations', auth, reservationCtrl.createReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationCtrl.deleteReservation);



module.exports = router;