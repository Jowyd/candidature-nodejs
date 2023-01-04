const {getCustomResMessage} = require("../../utils/personnal-error");
const {
    findChantier,
    putRandomChantier,
    updateChantier,
    deleteChantier
} = require("../helpers/chantier");

const route = require('express').Router();

/**
 * Get a new random chantier each call
 * @return chantier a random chantier
 */
route.get('/:numero', async function (req, res) {
    try {
        let numero = req.params.numero
        let chantier = await findChantier(numero);
        return res.json(chantier);
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on finding chantier', e)})
    }
});

/**
 * Insert a random chantier in database
 * @returns {Chantier} the new chantier
 */
route.put('/', async function (req, res) {
    try {
        let updatedChantier = await putRandomChantier();
        return res.json(updatedChantier);
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on updating random chantier', e)})
    }
});

/**
 * Update the chantier in body
 * @param numero the numero of the chantier to update
 * @body chantier the new chantier
 * @returns {Chantier} the updated chantier
 */
route.post('/:numero', async function (req, res) {
    try {
        let numero = req.params.numero;
        let description = req.body.description;
        let city = req.body.city;
        let city_cp = req.body.city_cp;
        let date_debut = req.body.date_debut;
        let date_fin = req.body.date_fin;
        let updatedChantier = await updateChantier(description, city, city_cp, date_debut, date_fin, numero);
        return res.json(updatedChantier);
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on updating chantier', e)})
    }
});

/**
 * Delete a chantier
 * @param numero the numero of the chantier to delete
 */
route.get('/delete/:numero', async function (req, res) {
    try {
        let numero = req.params.numero;
        await deleteChantier(numero);
        res.json();
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on updating chantier', e)})
    }
});

module.exports = route;
