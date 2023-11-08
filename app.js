const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;

app.use(favicon(`${__dirname}/favicon.ico`))
   .use(morgan('dev'))
   .use(express.json());

// sequelize.initDb();

// require('./src/routes/findAllPokemons')(app);
// require('./src/routes/findPokemonByPk')(app);
// require('./src/routes/createPokemon')(app);
// require('./src/routes/updatePokemon')(app);
// require('./src/routes/deletePokemon')(app); 
// require('./src/routes/login')(app);

//Routes
require('./src/routes/login')(app);

require('./src/routes/createJustDance')(app);
require('./src/routes/findJustDanceByPk')(app);
require('./src/routes/findAllJustDance')(app);
require('./src/routes/deleteJustDance')(app);
require('./src/routes/updateJustDance')(app);

require('./src/routes/createDanse')(app);
require('./src/routes/findDanseByPk')(app);
require('./src/routes/findAllDanses')(app);
require('./src/routes/deleteDanse')(app);
require('./src/routes/updateDanse')(app);

require('./src/routes/createPlateForme')(app);
require('./src/routes/findPlateFormeByPk')(app);
require('./src/routes/findAllPlateFormes')(app);
require('./src/routes/deletePlateForme')(app);

//Routes

app.use(({res}) => {
   const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
   res.status(404).json({message: message});
});

app.listen( port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));