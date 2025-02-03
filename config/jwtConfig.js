const JWT_SECRET = process.env.JWT_SECRET || 'order_app';
const JWT_EXPIRATION = '48h';

module.exports = {
    JWT_SECRET,
    JWT_EXPIRATION,
};