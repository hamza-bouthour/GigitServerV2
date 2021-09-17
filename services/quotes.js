const db = require('./db');

async function getBands() {
    const data = await db.query('SELECT * FROM Bands');
    const meta = {page:1}

    return {
        data, meta
    }
}
async function getArtists(id) {
    const data = await db.query(`SELECT * FROM Artists WHERE bandId = ${id}`);
    const meta = {page:1}

    return {
        data, meta
    }
}
async function getPhotos() {
    const data = await db.query('SELECT * FROM bandsImages');
    const meta = {page:1}
    return {
        data, meta
    }
}
async function getBandsQuery(col, query) {
    const data = await db.query(`SELECT * FROM Bands WHERE ${col} = '${query}'` );
    console.log(data)
    const meta = {page:1}

    return {
        data, meta
    }
}
async function addBand(values) {
    // console.log(values)
    const data = await db.query(`INSERT INTO Bands(email, password, name, style, description, lineup, country, city, zipcode, sound, image, cost, eventype) VALUES ('${values.email}', '${values.password}', '${values.name}', '${values.style}', '${values.description}', ${values.lineup}, '${values.country}' ,'${values.city}', ${values.zipcode}, ${values.sound}, ${values.image})`);
    const meta = {page:1}
    return {
        data, meta
    }
}

async function addPhoto(image, id) {
    console.log(image)
    console.log(id)
    const data = await db.query(`UPDATE Bands SET image = '${image}' WHERE band_id = ${id}`);
    const meta = {page:1}
    return {
        data, meta
    }
}

async function deleteBand(id) {
    const data = await db.query(`DELETE FROM Bands WHERE band_id=${id}`)
    const meta = {page:1}
    return {
        data, meta 
    }
}

async function fetchQueryBand(query) {
    const data = await db.query(`SELECT * FROM Bands WHERE style="${query}" OR name="${query}";`)
    const meta = {page:1}
    return {
        data, meta 
    }

}

module.exports = {getArtists, getPhotos, getBands, addBand, getBandsQuery, deleteBand, fetchQueryBand, addPhoto };