// Importer les modules nécessaires
const assert = require('assert');
const request = require('supertest');
const app = require('../app'); // Assurez-vous d'ajuster le chemin selon votre structure de projet
const Catway = require('../models/catways'); // Assurez-vous d'ajuster le chemin selon votre structure de projet
const Reservations = require('../models/reservations')
const jwt = require('jsonwebtoken')
const Mock = require('mockjs');
require('sinon-mongoose');
const catwayCtrl = require('../controllers/catways')
const reservationCtrl = require('../controllers/reservations')


describe('Catway Controller', function () {
    describe('createCatway', function () {
        it('should create a new catway', async function () {
            const req = {
                body: {
                    catwayNumber: '001',
                    type: 'short',
                    catwayState: false
                }
            };
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 201);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Objet enregistré !');
                }
            };
            await catwayCtrl.createCatway(req, res);
        });
    });

    describe('readAllCatways', function () {
        it('should return all catways', async function () {
            const req = {};
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert(Array.isArray(data));
                    // Vous pouvez ajouter d'autres vérifications ici
                }
            };
            await catwayCtrl.readAllCatways(req, res);
        });
    });

    describe('readOneCatway', function () {
        it('should return one catway', async function () {
            const req = {
                params: { id: 'ID_DU_CATWAY_A_TESTER' }
            };
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert(data.catway);
                    // Vous pouvez ajouter d'autres vérifications ici
                }
            };
            await catwayCtrl.readOneCatway(req, res);
        });
    });

    describe('updateCatway', function () {
        it('should update a catway', async function () {
            const req = {
                params: { id: 'ID_DU_CATWAY_A_TESTER' },
                body: {
                    catwayNumber: '002',
                    type: 'Type B',
                    catwayState: 'Inactive'
                }
            };
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Objet modifié !');
                }
            };
            await catwayCtrl.updateCatway(req, res);
        });
    });

    describe('deleteCatway', function () {
        it('should delete a catway', async function () {
            const req = {
                params: { id: 'ID_DU_CATWAY_A_TESTER' }
            };
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Objet supprimé !');
                }
            };
            await catwayCtrl.deleteCatway(req, res);
        });
    });
});
describe('Reservation Controller', function () {
    describe('createReservation', function () {
        it('should create a new reservation and update catway state', async function () {
            // Simule une demande contenant les données nécessaires
            const req = {
                body: {
                    catwayNumber: 100,
                    clientName: 'John Doe',
                    boatName: 'Boat A',
                    checkIn: Mock.Random.date(),
                    checkOut: Mock.Random.date()
                }
            };

            // Mock de la réponse
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 201);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Réservation enregistrée !');
                }
            };

            await reservationCtrl.createReservation(req, res);

            // Vérifie si la réservation a été créée et si l'état de la catway a été mis à jour
            const reservation = await Reservations.findOne({ clientName: 'John Doe' });
            const catway = await Catway.findOne({ catwayNumber: 100 });

            assert(reservation);
            assert.strictEqual(catway.catwayState, false);
        });
    });

    describe('getOneReservation', function () {
        it('should return one reservation', async function () {
            // Simule une demande contenant les données nécessaires
            const req = {
                params: { idReservation: 'ID_DE_LA_RESERVATION_A_TESTER' }
            };

            // Mock de la réponse
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert(data.reservation);
                }
            };

            reservationCtrl.getOneReservation(req, res);
        });
    });

    describe('getAllReservations', function () {
        it('should return all reservations', async function () {
            // Simule une demande vide
            const req = {};

            // Mock de la réponse
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert(Array.isArray(data.reservations));
                }
            };

            reservationCtrl.getAllReservations(req, res);
        });
    });

    describe('deleteReservation', function () {
        it('should delete a reservation and update catway state', async function () {
            // Simule une demande contenant les données nécessaires
            const randomReservation = {
                catwayNumber: 100, // Supposons que les numéros de catway sont compris entre 1 et 100
                clientName: 'John',
                boatName: 'boat',
                checkIn: Mock.Random.date(),
                checkOut: Mock.Random.date(),
            };
            const req = {
                params: { _id : randomReservation._id }
            };

            // Mock de la réponse
            const res = {
                status: function (code) {
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Réservation supprimée !');
                }
            };

            reservationCtrl.deleteReservation(req, res);

            
            const reservation = await Reservations.findOne({ _id: randomReservation._id });
            

            assert(!reservation);
            
        });
    });
});