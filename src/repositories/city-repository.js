const CrudRepository = require('./crud-repositary');
const { City } = require('../models');

class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;