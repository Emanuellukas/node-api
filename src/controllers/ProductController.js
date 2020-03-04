const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {//Buscando todos
        //Usando mongoose-paginate para trazer resultados com paginção
        //Usando req.query para trazer parâmetros tipo GET
        const { page = 1} = req.query;
        //Primeiro parâmetro se refere à construção da query (uso de where, orderBy, etc)
        const products = await Product.paginate({}, { page, limit: 10});

        return res.json(products);
    },

    async show(req, res) {//Atualizando
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    async store(req, res) {//Crianção
        const product = await Product.create(req.body);

        return res.json(product);
    },

    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,
            { new: true } //Utiliza o new para que seja retornado o objeto em seu estado atual, DEPOIS que ele foi atualizado
        );

        return res.json(product);
    },
    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id);

        return res.send();
     }

}