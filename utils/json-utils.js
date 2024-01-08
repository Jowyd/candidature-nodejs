const deleteNullValues = (json) => {
    for (let key in json) {
        if (json[key] === null)
            delete json[key];
        else if (typeof json[key] === 'object')
            deleteNullValues(json[key]);
    }
    return json;
}

module.exports = {deleteNullValues: deleteNullValues};
