const CrudRepository = require('./crud-repository');
const { airports } = require('../models');   

class AirportRepository extends CrudRepository {
    constructor() {
        super(airports);
    }
}

module.exports = AirportRepository;