const { StatusCodes } = require('http-status-codes');
const { AppError, ErrorResponse } = require ('../utils');

function validateCreateRequest(req, res, next) {
    if (!req.body.name || !req.body.code || !req.body.address || !req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while creating an Airport.';
        ErrorResponse.error = new AppError('Airport fields not found in the request body.', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest
}