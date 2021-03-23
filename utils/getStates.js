const axios = require('axios');

module.exports = async function (req, res, next) {

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

        // res.json(states);

        return statesreq;

    } catch (err) {
        // console.error(err);
        // res.status(500).send(err.message)
        return err;

    }

};