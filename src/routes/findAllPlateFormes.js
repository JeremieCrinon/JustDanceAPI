const { PlateForme } = require('../db/sequelize');
const { Op } = require('sequelize');
const plateForme = require('../models/plateForme');

module.exports = (app) => {
    app.get('/api/justDance/consoles', (req, res) => {
        if(req.query.Nom) {
            const Name = req.query.Nom;
            let limit = 10;
            if (req.query.limit !== undefined) {
                limit = req.query.limit;
            };
            let offset = 0;
            if (req.query.offset !== undefined) {
                offset = req.query.offset;
            }
            if(req.query.Nom.length < 2) {
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`;
                return res.status(400).json({message: message});
            };
            PlateForme.findAndCountAll({
                where: { 
                    Nom: {
                        [Op.like]: `%${Name}%`
                    } 
                },
                order: [['Id_plate_forme', 'ASC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
            .then(({count, rows}) => {
                const plateFormes = rows.map(plateForme => { 
                    plateForme = plateForme.get({ plain: true});
                    delete plateForme.types_string;
                    return plateForme;
                });
                const message = `Il y a ${count} plate forme(s) qui correspondent au terme de recherche '${Name}'.`;
                res.json({ message: message, data: plateFormes});
            })
        }
        else {
            PlateForme.findAll({ order: [['Id_plate_forme', 'ASC']] })
            .then(result => {
                const plateFormes = result.map(plateForme => {
                    plateForme = plateForme.get({ plain: true});
                    delete plateForme.types_string;
                    return plateForme;
                });
                const message = 'La liste des plates formes a bien été récupérée.';
                res.json({message: message, data: plateFormes});
            })
            .catch(error => {
                console.log(error);
                const message = `La liste des plates formes n'a pas pu être récupérée. Réesssayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
        }
    });
}