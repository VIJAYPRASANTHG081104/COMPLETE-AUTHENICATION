const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
       const token = req.headers.authorization.split(" ")[1];

       // Retrieve the user details from the logged-in user's token
       const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

       req.user = decodedToken;

       next();
    } catch (error) {
        res.status(401).send({ error: "Authentication Failed" });
    }
};

module.exports = auth
