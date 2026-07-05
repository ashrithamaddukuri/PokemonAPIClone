const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "Login first"
            });
        }

        const decode = jwt.verify(token, process.env.jwt_secret_key);

        req.user = decode.id;

        next();

    } catch (err) {

        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = auth;
