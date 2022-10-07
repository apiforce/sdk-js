//const arr = require("rhinojs/support/arr");

class Resource {
    /**
     * Construtor.
     */
    constructor(client, endpoint, methods = {}) {
        this.client   = client;
        this.endpoint = endpoint;

        // Aplicar metodos customizaveis
        var keys = Object.keys(methods);
        for (var i = 0; i < keys.length; i++) {
            var method_key = keys[i];

            this[method_key] = methods[method_key];
        }
    }

    /**
     * Retorna a lista de objetos conforme o filtro.
     * 
     * @param {object} query 
     * @param {object} headers
     * @returns {object}
     */
    async findAll(query = {}, headers = {})
    {
        return await this.client.get(this.endpoint, query, {}, headers);
    }

    /**
     * Retorna um objeto, conforme o filtro.
     * 
     * @param {object} query 
     * @param {object} headers 
     * @returns {Object|null}
     */
    async findOne(query = {}, headers = {})
    {
        query.offset = 0;
        query.limit  = 1;

        var ret = await this.findAll(query, headers);

        if (ret.count >= 1) {
            return ret.lista[0];
        }

        return null;
    }

    /**
     * Carregar objeto com os valores create.
     * 
     * @param {object} query 
     * @param {object} headers 
     * @returns {Object}
     */
    async create(query = {}, headers = {})
    {
        return this.client.get(this.endpoint + '/create', query, {}, headers);
    }

    /**
     * Carregar objeto com os valores edit recurso.
     * 
     * @param {string} id 
     * @param {object} query 
     * @param {object} headers 
     * @returns {Object}
     */
     async edit(id, query = {}, headers = {})
     {
         return this.client.get(this.endpoint + '/' + id + '/edit', query, {}, headers);
     } 

    /**
     * Criar um novo objeto do recurso.
     * 
     * @param {object} data Campos
     * @param {object} query
     * @param {object} headers
     * @returns {object}
     */
    async store(data, query = {}, headers = {})
    {
        return await this.client.post(this.endpoint, data, query, headers);
    }

    /**
     * Atualizar dados do recurso.
     * 
     * @param {string} id ID do recurso
     * @param {object} data Campos
     * @param {object} query 
     * @param {object} headers 
     * @returns {object}
     */
    async update(id, data, query = {}, headers = {})
    {
        return await this.client.put(this.endpoint + '/' + id, data, query, headers);
    }

    /**
     * Excluir recursos.
     * 
     * @param {string,array} ids Lista de ids
     * @param {object} query 
     * @param {object} headers 
     * @returns {object}
     */
    async delete(ids, query = {}, headers = {})
    {
        var url = this.endpoint;

        if (typeof ids == 'string') {
            url += '/' + ids;
        } else {
            query.ids = (typeof ids == 'object') ? ids.join(',') : ids;
        }

        return await this.client.delete(url, {}, query, headers);
    }
}

module.exports = Resource;