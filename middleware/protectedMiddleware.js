const mwConfig = require("../middleware/middlewareConfig.js");
const jwt = mwConfig.jwt;

module.exports = {
    protected,
    checkRole,
};

function protected(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "invalid token" });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "no token provided" });
    }
}

function checkRole(department) {
    return function(req, res, next) {
        if (req.decodedToken.department.includes(department)) {
            next();
        } else {
            res.status(403).json({
                message: `You need to be in ${department} department!`,
            });
        }
    };
}
