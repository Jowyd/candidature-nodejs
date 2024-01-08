const {getCustomResMessage} = require("../../utils/personnal-error");
const { getRandomInt } = require("../../utils/random-utils");
const {
    findChantier,
    insertRandomChantier,
    updateChantier,
    deleteChantier,
    Chantier,
    getRandomChantier
} = require("../helpers/chantier");

const route = require('express').Router();

/**
 * Get a new random chantier each call if no numero is given
 * @param numero the numero of the chantier to find
 * @return {Chantier} a random chantier
 */
route.get('/:numero?', async function (req, res) {
    try {
        // Get a new random chantier each call
        let numero = req.params.numero;
        if(!numero){
            return res.json(await getRandomChantier());
        }
        return res.json(await findChantier(numero));
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on finding chantier', e)})
    }
});

/**
 * Insert a random chantier in database
 * @returns {Chantier} the new chantier
 */
route.post('/', async function (req, res) {
    try {
        let updatedChantier = await insertRandomChantier();
        return res.status(201).json(updatedChantier);
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on inserting random chantier', e)})
    }
});

/**
 * Update the chantier in body
 * @param numero the numero of the chantier to update
 * @body chantier the new chantier
 * @returns {Chantier} the updated chantier
 */
route.put('/:numero', async function (req, res) {
    try {
        let numero = req.params.numero;
        let description = req.body.description;
        let city = req.body.city;
        let city_cp = req.body.city_cp;
        let date_debut = req.body.date_debut;
        let date_fin = req.body.date_fin;
        let updatedChantier = await updateChantier(description, city, city_cp, date_debut, date_fin, numero);
        let newChantier = await findChantier(numero);
        return res.json(newChantier);
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on updating chantier', e)})
    }
});

/**
 * Delete a chantier
 * @param numero the numero of the chantier to delete
 */
route.delete('/:numero', async function (req, res) {
    try {
        let numero = req.params.numero;
        const deletedChantier = await deleteChantier(numero);
        if(deletedChantier.affectedRows === 0){
            return res.status(500).json({key: 'Chantier not found'});
        }
        return res.json({key: 'Chantier deleted'});
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on deleting chantier', e)})
    }
});

module.exports = route;
