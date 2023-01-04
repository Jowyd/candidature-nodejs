const {PersonnalError} = require("../../utils/personnal-error");
const {getRandomString, getRandomInt} = require("../../utils/random-utils");
const {query} = require("../../utils/database-connection");

async function findChantier(id, params) {
    try {
        const chantiers = await query('SELECT * FROM chantier');
        return chantiers.find((chantier => chantier.numero == id))
    } catch(e){
        throw e;
    }
}

async function putRandomChantier() {
    try {
        const description = getRandomString(12);
        const city = getRandomString(12);
        const city_cp = getRandomInt(0, 99999);
        const date_debut = '2022-12-12';
        const date_fin = '2022-12-12';
        return await query(
            "INSERT INTO chantier(description, city, city_cp, date_debut, date_fin) values(?, ?, ?, ?, ?)",
            [description, city, city_cp, date_debut, date_fin]
        );
    } catch (e) {
        console.error(e);
        throw new PersonnalError('Error when querying', e);
    }
}

async function updateChantier(description, city, city_cp, date_debut, date_fin, numero) {
    try {
        return await query('UPDATE chantier ' +
            "SET description = '" + description
            + "', city = '" + city
            + "', city_cp = " + city_cp
            + ", date_debut = '" + date_debut
            + "', date_fin = '" + date_fin
            + "' WHERE numero = " + numero
        );
    } catch (e) {
        console.error(e);
        throw new PersonnalError('Error when querying', e);
    }
}

async function deleteChantier(numero) {
    try {
        return await query('DELETE FROM chantier WHERE numero = ?', [numero]);
    } catch (e) {
        console.error(e);
        throw new PersonnalError('Error when querying', e);
    }
}

module.exports = {findChantier, putRandomChantier, updateChantier, deleteChantier};
