const { Dance } = require('../db/sequelize');
const { Op } = require('sequelize');

module.exports = (app) => {
    app.get('/api/justDance/danses', (req, res) => {
        if(req.query.Titre) {
            const title = req.query.Titre;
            let limit = 10;
            if (req.query.limit !== undefined) {
                limit = req.query.limit;
            };
            let offset = 0;
            if (req.query.offset !== undefined) {
                offset = req.query.offset;
            }
            if(req.query.Titre.length < 2) {
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`;
                return res.status(400).json({message: message});
            };
            Dance.findAndCountAll({
                where: { 
                    Titre: {
                        [Op.like]: `%${title}%`
                    } 
                },
                order: [['Id_danse', 'ASC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
            .then(({count, rows}) => {
                const dances = rows.map(dance => { 
                    dance = dance.get({ plain: true});
                    delete dance.types_string;
                    return dance;
                });
                const message = `Il y a ${count} danse(s) qui correspondent au terme de recherche '${title}'.`;
                res.json({ message: message, data: dances});
            })
        }
        else {
            Dance.findAll({ order: [['Id_danse', 'ASC']] })
            .then(result => {
                const dances = result.map(dance => {
                    dance = dance.get({ plain: true});
                    delete dance.types_string;
                    return dance;
                });
                const message = 'La liste des danses a bien été récupérée.';
                res.json({message: message, data: dances});
            })
            .catch(error => {
                const message = `La liste des danses n'a pas pu être récupérée. Réesssayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
        }
    });
}