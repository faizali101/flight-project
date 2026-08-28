const CrudRepository = require('./crud-repositary');
const { airports } = require('../models');   

class AirportRepository extends CrudRepository {
    constructor() {
        super(airports);
    }
}

module.exports = AirportRepository;