const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const profiles = await connection('profiles').select('*');

        return response.json(profiles);
    },


    async listByParam(request, response) {
      const { search } = request.body;

      const profiles = await connection('profiles').where('materials', 'like', '%'+ materials +'%');

      return response.json(profiles);
    },


    async create(request, response) {
        const { name, cnpj, email, contact, materials, city, uf } = request.body;

        const id = generateUniqueId();

        await connection('profiles').insert({
            id,
            name,
            cnpj,
            email,
            contact,
            materials,
            city,
            uf
        });

        return response.json({ id });

    },


    async update(request, response) {
      const { id } = request.params;
      const { material, email, contact, city, uf } = request.body;

      await connection('profiles')
        .where('id', id)
        .update({
          "material": material,
          "email": email,
          "contact": contact,
          "city": city,
          "uf": uf
        });

      return response.status(204).send();
    },
};
