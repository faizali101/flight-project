const { StatusCodes } = require('http-status-codes');
const { AppError, ErrorResponse } = require ('../utils');

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = 'something went wrong while creating an Airplane.'
        ErrorResponse.error = new AppError('Model Number not found.')
        return res 
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    } next ();
}


module.exports = {
    validateCreateRequest
}