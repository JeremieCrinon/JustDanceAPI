const { Sequelize, DataTypes } = require('sequelize');
const JustDanceModel = require('../models/justDance');
const DanceModel = require('../models/dance');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

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
const User = UserModel(sequelize, DataTypes);

// const initDb = () => {
//     return sequelize.sync({force: true}).then(_ => {
//         bcrypt.hash('LittleSiha est la best', 10)
//         .then(hash => {
//             return User.create({
//                 username: 'Siha',
//                 password: hash
//             });
//         })
//         .then( user => console.log(user.toJSON()));
//         console.log('La base de donnée a bien été initialisée.')
//     });
// }


module.exports = {
    JustDance, Dance, User
}