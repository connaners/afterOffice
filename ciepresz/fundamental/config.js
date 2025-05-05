require('dotenv').config();

const requiredEnv = ['ENV', 'API_URL'];
const users = require('./data/user_data.json');
const booking = require('./data/booking_data.json');
const auth = require('./helper/authHelper.js');


if (process.env.ENV !== 'restful-booker') {
    console.log('Environtment:', process.env.ENV);
    console.log('API URL:', process.env.API_URL);
}

try {
    requiredEnv.forEach(env => {
        if (!process.env[env]) {
            throw new Error(`Missing required environment variable: ${env}`);
        }
    });
} catch (err) {
    console.error('Config error:' + err.message);
    process.exit(1); //biar keluar clean
}

module.exports = {
    apiURL: process.env.API_URL || 'restful-booker.herokuapp.com', //fallback url
    users: users,
    booking: booking,
}