const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');
const { Op } = require('sequelize');

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
        return response;
    } catch (error) {
        throw new AppError('Cannot delete the Flight.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    if (query && query.trips) {
        const [departureAirportID, arrivalAirportID] = query.trips.split("-");
        customFilter.departureAirportID = departureAirportID;
        customFilter.arrivalAirportID = arrivalAirportID;
    }
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 100000 : maxPrice)]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.gte]: query.tripDate
        }
    }
    if (query.sort) {
        const params = query.sort.split(",");
        sortFilter = params.map((param) => param.split("_"));
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all flights.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(id, data) {
    try {
        const response = await flightRepository.update(id, data);
        return response;
    } catch (error) {
        throw new AppError('Cannot update this Flight.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        if (!flight) {
            throw new AppError('The Flight you requested is not present.', StatusCodes.NOT_FOUND);
        }
        return flight;
    } catch (error) {
        throw error;
    }
}

async function updateSeats(data) {
    try {
        const decr = data.decr === true || data.decr === 'true';
        const response = await flightRepository.updateRemainingSeats(data.flightID, data.seats, decr);
        if (!response) {
            throw new AppError('The Flight you requested is not present.', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Cannot update seats.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    deleteFlight,
    getAllFlights,
    updateFlight,
    getFlight,
    updateSeats
};