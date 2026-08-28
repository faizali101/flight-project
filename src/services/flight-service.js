const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        if (error.name == 'SequelizeValidationError') {
            let explantions = [];
            error.errors.forEach((err) => {
                explantions.push(err.message);
            });
            throw new AppError(explantions, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteFlight(id) {
    try {
        const response = await flightRepository.destroy(id);
        if (!response) {
            throw new AppError('The flight you requested to delete does not exist.', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFlight,
    deleteFlight
};
