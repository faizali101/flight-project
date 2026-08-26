const { AirplaneRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes')
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
        if (!airplane) {
            const error = new Error('The airplane you requested does not exist');
            error.statusCode = 404;
            throw error;
        }
        return airplane;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAirplanes,
    getAirplanes,
    getAirplane
};