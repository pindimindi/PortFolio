const express = require('express');
const router = express.Router();
const axios = require('axios');

const getStates = require('../../utils/getStates');
const updateToken = require('../../utils/updateGeoApiToken');


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
        const states = statesreq.data;

        res.json(states);

    } catch (err) {
        console.error(err);
        console.log("STAES ERROR CATCH", err);
        res.status(500).send(err.message)

    }
    // let stateresponse = getStates(req, res);
    // if (!stateresponse.data) {
    //     console.log("it gets to if block");
    //     updateToken();
    //     stateresponse = getStates(req, res);
    // }
    // res.json(stateresponse.data);

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