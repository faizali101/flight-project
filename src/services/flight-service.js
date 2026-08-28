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


module.exports = {
    createFlight
};
