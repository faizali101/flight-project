const { StatusCodes } = require('http-status-codes');
const { AppError, ErrorResponse, compareTime } = require ('../utils');

function validateCreateRequest(req, res, next) {
   if (!req.body.flightNumber || !req.body.airplaneID || !req.body.departureAirportID || !req.body.arrivalAirportID || !req.body.arrivalTime || !req.body.departureTime || !req.body.price || !req.body.totalSeats) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        ...ErrorResponse,
        message: 'Something went wrong while creating a Flight.',
        error: 'Flight fields not found in the request body.',
    });
   }
    if (!compareTime(req.body.arrivalTime, req.body.departureTime)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            ...ErrorResponse,
            message: 'Something went wrong while creating a Flight.',
            error: 'Departure time must be before arrival time.',
        });
    }
    next();
}

function validateUpdateSeatsRequest (req, res, next) {
    if (!req.body.seats) {
        ErrorResponse.message = 'something went wrong while updating a seat.'
        ErrorResponse.error = new AppError('flight ID not found.')
        return res 
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    } next ();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
}