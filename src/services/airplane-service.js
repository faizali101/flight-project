const { AirplaneRepository } = require('../repositories');

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

module.exports = {
    createAirplanes,
    getAirplanes,
};