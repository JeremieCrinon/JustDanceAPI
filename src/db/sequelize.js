const { Sequelize, DataTypes } = require('sequelize');
const JustDanceModel = require('../models/justDance');
const DanceModel = require('../models/dance');
const PlateFormeModel = require('../models/plateForme');
const UserModel = require('../models/user');

const sequelize = new Sequelize('JustDance', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            timezone: '+02:00'
        },
        logging: true
    });

sequelize.authenticate()
.then(_ => console.log('La connection à la BDD a bien été établie.'))
.catch(error => console.error(`Impossible de se connecter à la BDD : ${error}`));

const JustDance = JustDanceModel(sequelize, DataTypes);
const Dance = DanceModel(sequelize, DataTypes);
const PlateForme = PlateFormeModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);


module.exports = {
    JustDance, Dance, PlateForme, User
}