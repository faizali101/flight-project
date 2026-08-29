const { FlightService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const {successResponse, errorResponse} = require('../utils');

/*
POST /flights
req-body {
flightNumber : 'UK-77',
airplaneID : (id of airplane),
departureAirportID : '233',
arrivalAirportID : '788',
arrivalTime : '7:30 PM',
departureTime : '4:00 PM',
price : '$120.00',
boardingGate : 'GATE-5',
totalSeats : (airplane seats)
}
*/
async function createFlight(req, res) {
    try {
        console.log('inside controller');
        const flight = await FlightService.createFlight({
            flightNumber : req.body.flightNumber,
            airplaneID: req.body.airplaneID,
            departureAirportID: req.body.departureAirportID,
            arrivalAirportID: req.body.arrivalAirportID,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats : req.body.totalSeats

        });
        return res
            .status(StatusCodes.CREATED) 
            .json({
                success: true,
                message: 'Successfully created a Flight.',
                data: flight,
                error: {},
            });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: 'Something went wrong while creating a Flight.',
                data: {},
                error: error.message,
            });
    }
}

/*
DELETE : flights/:id
req-param {}
*/
async function deleteFlight(req, res) {
    try {
        const flight = await FlightService.deleteFlight(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted the Flight.',
            data: flight,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while deleting the Flight.',
            data: {},
            error: error.message,
        });
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched all Flights.',
            data: flights,
            error: {},
        });
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Something went wrong while fetching Flights.',
            data: {},
            error: error.error || {},
        });
    }
}

/*
PATCH airplanes/:id
req-body {}
*/
async function updateFlight(req, res) {
    try {
        const flights = await FlightService.updateFlight(req.params.id, {
             flightNumber : req.body.flightNumber,
            airplaneID: req.body.airplaneID,
            departureAirportID: req.body.departureAirportID,
            arrivalAirportID: req.body.arrivalAirportID,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats : req.body.totalSeats
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated an Flight.',
            data: flights,
            error: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while updating the Flight.',
            data: {},
            error: error.message,
        });
    }
}

module.exports = {
    createFlight,
    deleteFlight,
    getAllFlights,
    updateFlight
}