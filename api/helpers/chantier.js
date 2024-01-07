const {PersonnalError} = require("../../utils/personnal-error");
const {getRandomString, getRandomInt} = require("../../utils/random-utils");
const {query} = require("../../utils/database-connection");


class Chantier {
    constructor(numero, description, city, city_cp, date_debut, date_fin) {
        this.numero = numero;
        this.description = description;
        this.city = city;
        this.city_cp = city_cp;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
    }
}

async function getRandomChantier(){
    try {
        const chantiers = await query('SELECT * FROM chantier ORDER BY RAND() LIMIT 1');
        if(chantiers.length === 0){
            throw new PersonnalError('Chantier not found', null);
        }
        return chantiers[0];
    } catch(e){
        throw new PersonnalError('Error when finding random chantier', e);
    }
}

async function findChantier(id) {
    try {
        const chantiers = await query('SELECT * FROM chantier WHERE numero = ?', [id]);
        if(chantiers.length === 0){
            throw new PersonnalError('Chantier not found', null);
        }
        return chantiers[0];
    } catch(e){
        throw new PersonnalError('Error when finding chantier: '+ id, e);
    }
}

async function insertRandomChantier() {
    try {
        const description = getRandomString(12);
        const city = getRandomString(12);
        const city_cp = getRandomInt(0, 99999);
        const date_debut = '2022-12-12';
        const date_fin = '2022-12-12';
        const sqlQuery = await query(
            "INSERT INTO chantier(description, city, city_cp, date_debut, date_fin) values(?, ?, ?, ?, ?)",
            [description, city, city_cp, date_debut, date_fin]
            );
        const chantier = new Chantier(sqlQuery.insertId, description, city, city_cp, date_debut, date_fin);
        return chantier;
    } catch (e) {
        console.error(e);
        throw new PersonnalError('Error when inserting random chantier', e);
    }
}

async function updateChantier(description, city, city_cp, date_debut, date_fin, numero) {
    try {
        return await query('UPDATE chantier SET description = IFNULL(?, description), city = IFNULL(?, city), city_cp = IFNULL(?, city_cp), date_debut = IFNULL(?, date_debut), date_fin = IFNULL(?, date_fin) WHERE numero = ?',
            [description, city, city_cp, date_debut, date_fin, numero]
        );
    } catch (e) {
        console.error(e);
        throw new PersonnalError('Error when updating chantier'+ numero, e);
    }
}

async function deleteChantier(numero) {
    try {
        return await query('DELETE FROM chantier WHERE numero = ?', [numero]);
    } catch (e) {
        console.error(e);
        throw new PersonnalError('Error when deleting chantier'+ numero, e);
    }
}

module.exports = {findChantier, insertRandomChantier, updateChantier, deleteChantier, Chantier, getRandomChantier};
