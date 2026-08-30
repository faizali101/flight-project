const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sortFilter) {
        const response = await this.model.findAll({
            where: filter,
            order: sortFilter || []
        });
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: { id }
        });
        return response;
    }

   async updateRemainingSeats(flightID, seats, decr = true) {
    const flight = await this.model.findByPk(flightID);
    if (!flight) {
        return null;
    }
    if (decr) {
        await this.model.decrement('totalSeats', {
            by: seats,
            where: { id: flightID }
        });
    } else {
        await this.model.increment('totalSeats', {
            by: seats,
            where: { id: flightID }
        });
    }
    const updatedFlight = await this.model.findByPk(flightID);
    return updatedFlight;
}
}



module.exports = FlightRepository;