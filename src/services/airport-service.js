const { AirportRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        throw error;
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw error;
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        if (!airport) {
            throw new AppError('The Airport you requested is not present.', StatusCodes.NOT_FOUND);
        }
        return airport;
    } catch (error) {
        throw error;
    }
}

async function deleteAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        throw new AppError('Cannot delete the Airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
        throw new AppError('Cannot update this airport.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport,
};