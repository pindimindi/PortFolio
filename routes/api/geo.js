const express = require('express');
const router = express.Router();
const axios = require('axios');

const config = {
    headers: {
        "Authorization": 'Bearer ' + process.env.GEO_API_AUTH_TOKEN,
        "Accept": "application/json"
    }
}

router.post('/states', async (req, res) => {
    try {
        const { country } = req.body;
        const statesreq = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, config);
        // const statesreq = getStates(req, res);
        const states = statesreq.data;

        res.json(states);

    } catch (err) {
        console.error(err);
        console.log("STAES ERROR CATCH", err);
    }

});

router.post('/cities', async (req, res) => {
    try {
        const { state } = req.body;

        const citiesreq = await axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, config);
        const cities = citiesreq.data;

        res.json(cities);


    } catch (err) {
        console.error(err);
    }
});

module.exports = router;