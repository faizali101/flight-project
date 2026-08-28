const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explantions = [];
            error.errors.forEach((err) => {
                explantions.push(err.message);
            });
            throw new AppError(explantions, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        if (!response) {
            throw new AppError('The city you requested to delete does not exist.', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        const affectedCount = response[0];
        if (!affectedCount) {
            throw new AppError('The city you requested to update does not exist.', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function getCities() {
    try {
        const city = await cityRepository.getAll();
        return city;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity,
    getCities
};