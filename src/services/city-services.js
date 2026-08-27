const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        throw new AppError('Cannot create city.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
};