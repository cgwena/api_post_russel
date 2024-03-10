const Catway = require('../models/catways')

exports.createCatway = (req, res, next) => {
    const catway = new Catway({
        _id: req.body.catwayNumber,
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState,
    });
    catway.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.readAllCatways = (req, res, next) => {
    return Catway.find()
        .then(catways => res.status(200).json(catways))
        .catch(error => res.status(400).json({ error }));
}

exports.readOneCatway = (req, res, next) => {
    Catway.findOne({ _id: req.params.id })
        .then(catway => res.status(200).json({ catway }))
        .catch(error => res.status(404).json({ error }));
}

exports.updateCatway = (req, res, next) => {
    Catway.updateOne({ _id: req.params.id }, {
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState,
        _id: req.params.id
    })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteCatway = (req, res, next) => {
    Catway.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}