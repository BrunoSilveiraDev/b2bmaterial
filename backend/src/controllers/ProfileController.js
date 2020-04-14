const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const profiles = await connection('profiles').select('*');

        return response.json(profiles);
    },


    async create(request, response) {
        const { name, cnpj, email, contact, city, uf } = request.body;

        const id = generateUniqueId();

        await connection('profiles').insert({
            id,
            name,
            cnpj,
            email,
            contact,
            city,
            uf
        });

        return response.json({ id });

    },

};
