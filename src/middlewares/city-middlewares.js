const { StatusCodes } = require('http-status-codes');
const { AppError, ErrorResponse } = require ('../utils');

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = 'something went wrong while creating a City.'
        ErrorResponse.error = new AppError('Name not found.')
        return res 
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    } next ();
}


module.exports = {
    validateCreateRequest
}