const Reservations = require('../models/reservations')
const Catway = require('../models/catways')

exports.createReservation = async (req, res, next) => {
    try {
        const reservation = new Reservations({
            catwayNumber: req.body.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        })
        const catway = await Catway.findOne({ catwayNumber: reservation.catwayNumber })
        catway.catwayState = false
        await reservation.save()
        await catway.save()
        res.status(201).json({ message: 'Réservation enregistrée !' });
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getOneReservation = async (req, res, next) => {
    try {
        const reservation = await Reservations.findOne({ _id: req.params.idReservation })
        if (!reservation) {
            return res.status(400).json({ message: 'Réservation non trouvée' })
        }
        res.status(200).json({ reservation: reservation })
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservations.find()
        res.status(200).json({ reservations: reservations })
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservations.findOne({ _id: req.params.idReservation });

        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        const catway = await Catway.findOne({ catwayNumber: reservation.catwayNumber });

        if (!catway) {
            return res.status(404).json({ error: 'Catway non trouvé' });
        }

        catway.catwayState = true;
        await catway.save();

        await Reservations.deleteOne({ _id: req.params.idReservation });

        res.status(200).json({ message: 'Réservation supprimée !' });
    } catch (error) {
        res.status(400).json({ error });
    }
};