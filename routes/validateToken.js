const jwt = require('jsonwebtoken')
// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
 //const token = req.header('auth-token');
 const token = req.headers['authorization'];
 if (!token) return res.status(401).json({ error: 'Access denied' });
 try {
 const bearer = token.split(' ');
 const bearerToken = bearer[1];
 const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);

 //const verified = jwt.verify(token, process.env.JWT_SECRET);
 req.user = verified;
 next() // continuamos;
 } catch (error) {
 res.status(400).json({error: 'token not valid'});
 }
}
module.exports = verifyToken;