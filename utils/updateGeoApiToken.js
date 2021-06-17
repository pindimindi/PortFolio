const axios = require('axios');

module.exports = async function (req, res, next) {
    const config = {
        headers: {
            "Accept": "application/json",
            "api-token": process.env.GEO_API_KEY,
            "user-email": process.env.GEO_API_EMAIL
        }
    }
    try {

        const { data } = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', config);

        if (data.auth_token) {
            console.log("TOKEN from function", data.auth_token);
            process.env['GEO_API_AUTH_TOKEN'] = data.auth_token;
        }

    } catch (error) {
        console.error(error)
    }

};