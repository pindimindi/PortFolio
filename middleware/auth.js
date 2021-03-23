const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'authorization denied, Plese Log In to continue' }] });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded.user;
        next();

    } catch (err) {
        console.error(err)
        res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
    }
};