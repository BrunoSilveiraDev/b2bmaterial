const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('PROFILE', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new PROFILE', async () => {
        const response =  await request(app)
            .post('/profiles')
            // for set some headers
            //.set('Authorization', 'asd')
            .send({
                name: "TESTE",
                cnpj: "000000000000000",
                email: "contato@teste.com",
                contact: "0000000000",
                city: "Manaus",
                uf: "AM"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
