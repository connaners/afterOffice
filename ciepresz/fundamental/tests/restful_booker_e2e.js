const config = require('../config.js')
const { login } = require('../helper/authHelper.js');
const request = require('supertest');
const expect = require('chai').expect;

let url = config.apiURL
let endpoint = '/booking'
let header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
let tokenAuth
let bookingID

describe('create booking and delete booking', () => {
    before(async function () {
        this.timeout(10000)
        const res = await login({
            url,
            header,
            payload: config.users
        })
        tokenAuth = await res.body.token
    });

    it('create booking', async () => {
        let body = config.booking;
        const response = await request(url)
            .post(endpoint)
            .set(header)
            .send(body);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('bookingid');
        bookingID = response.body.bookingid
    });

    it('get booking by id', async () => {
        const newEndpoint = `${endpoint}/${bookingID}`;
        const response = await request(url)
            .get(newEndpoint)
            .set(header)

        expect(response.status).to.equal(200);
    });

    it('delete booking', async function () {
        this.timeout(10000);
        const newEndpoint = `${endpoint}/${bookingID}`;
        const response = await request(url)
            .delete(newEndpoint)
            .set({ ...header, Cookie: `token=${tokenAuth}` })
            .send();
        expect(response.status).to.equal(201);
    });
});

