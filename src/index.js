const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { col } = require('sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    const { City } = require('./models');
    const cityRecord = await City.findByPk(1);
    await cityRecord.createAirport({name: "Indore", code: "INDR"});
});


 