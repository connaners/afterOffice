const request = require('supertest');

const endpoint = '/auth';
const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

async function login({url, payload}) {
    const res = await request(url)
        .post(endpoint)
        .set(header)
        .send(payload);
    return { tokenAuth: res.body.token };
}

module.exports = { login };
