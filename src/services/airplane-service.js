const { AirplaneRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils');
const airplaneRepository = new AirplaneRepository();

async function createAirplanes(data) {
    try {
        console.log('inide services');
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();  
        return airplanes;
    } catch (error) {
        throw error;  
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.StatusCodes === StatusCodes.NOT_FOUND) {
            throw new AppError('The Airplane you requested is not present.',error.StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of all the Airplanes.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {  
            throw new AppError('The Airplane you want to delete is not present.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete the Airplane.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data) {
    try {
        const response = await airplaneRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {  
            throw new AppError('The Airplane you want to update is not present.', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update this airplane.', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplanes,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
};