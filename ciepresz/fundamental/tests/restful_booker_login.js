const expect = require('chai').expect;
const { login } = require('../helper/authHelper.js');
const config = require('../config.js');
const newPayload = () => JSON.parse(JSON.stringify(config.users));


describe('login', () => {
    it('login success', async function () {
        const res = await login({
            url: config.apiURL,
            payload: config.users,
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
    });

    it('invalid login input wrong username', async function () {
        this.timeout(5000);
        const invalidUsername = newPayload();
        invalidUsername.username = 'admon';
        const res = await login({
            url: config.apiURL,
            payload: invalidUsername,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('reason');
        expect(res.body.reason).to.include('Bad credentials');
    });

    it('invalid login input wrong password', async function () {
        this.timeout(5000);
        const invalidPassword = newPayload();
        invalidPassword.password = 'piswird';
        const res = await login({
            url: config.apiURL,
            payload: invalidPassword,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('reason');
        expect(res.body.reason).to.include('Bad credentials');
    });
});
