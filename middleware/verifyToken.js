//Mathilda Eriksson, DT162G, HT23

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Åtkomst nekad.');

    // Split header to get only token part, not Bearer
    const token = authHeader.split(' ')[1]; // Bearer YOUR_JWT_TOKEN

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Ogiltigt token.');
    }
};

module.exports = verifyToken;