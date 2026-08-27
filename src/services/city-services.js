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

async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response; 
    } catch (error) {
        throw new AppError('Cannot delete city', statusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    deleteCity
};