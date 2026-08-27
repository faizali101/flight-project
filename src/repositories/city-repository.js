const CrudRepository = require('./crud-repositary');
const { city } = require('../models');

class CityRepository extends CrudRepository {
    constructor() {
        super(city);
    }
}

module.exports = CityRepository;