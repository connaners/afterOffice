const expect = require('chai').expect;
const login = require('../helper/authHelper.js');

let authToken

describe('login', () => {
    it('login success', async () => {
        const response = await login();
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        // authToken = await response.body.token
    });

    it('invalid login input wrong username', async function () {
        const response = await login({ username: 'admion' });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('reason');
        expect(response.body.reason).to.include('Bad credentials');
    });

    it('invalid login input wrong password', async function () {
        const response = await login({ password: 'piswird' });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('reason');
        expect(response.body.reason).to.include('Bad credentials');
    })
});