const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({message: 'User is not authorized'})
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.decode(token, JWT_SECRET);
        if (decoded) {
            req.userId = decoded.userId;
            next();
        }
    }
    catch(error) {
        return res.status(403).json({message: error})
    }
}

module.exports = {authMiddleware}