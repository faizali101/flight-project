const {StatusCodes} = require('http-status-codes')
const { logger } = require('../config');
const { AppError } = require('../utils')

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id,
            }
        });
        if (!response) {
            throw new AppError('Not able to delete the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError('Not able to find the resource.', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    } 

    async update(id, data) {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new AppError('Not able to update the resource.', StatusCodes.NOT_FOUND);
        }
        const [affectedRows] = await this.model.update(data, {
            where: {
                id: id
            }
        });
        
        return record; 
    }
}

module.exports = CrudRepository;