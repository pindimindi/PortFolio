const axios = require('axios');

const updateToken = require('./updateGeoApiToken');

module.exports = async function (req, res, next) {

    console.log('TOKEN FROM TRY', process.env.GEO_API_AUTH_TOKEN)

    const config = {
        headers: {
            "Authorization": 'Bearer ' + process.env.GEO_API_AUTH_TOKEN,
            "Accept": "application/json"
        }
    }

    try {
        const { country } = req.body;

        const statesreq = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, config);
        const states = statesreq.data;
        console.log('states from get states', states)

        res.json(states);

        // return statesreq;

    } catch (err) {
        console.error(err);
        await updateToken(req, res);
        console.log('NEW TOKEN FROM ORIGINAL', process.env.GEO_API_AUTH_TOKEN)
        return err;

    }

};