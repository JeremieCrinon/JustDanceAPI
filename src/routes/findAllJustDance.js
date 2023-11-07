const { JustDance } = require('../db/sequelize');
const { Op } = require('sequelize');

module.exports = (app) => {
    app.get('/api/justDance/games', (req, res) => {
        if(req.query.Nom) {
            const name = req.query.Nom;
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
            JustDance.findAndCountAll({
                where: { 
                    Nom: {
                        [Op.like]: `%${name}%`
                    } 
                },
                order: [['Id_jeu', 'ASC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
            .then(({count, rows}) => {
                const justDances = rows.map(justDance => { 
                    justDance = justDance.get({ plain: true});
                    delete justDance.types_string;
                    return justDance;
                });
                const message = `Il y a ${count} Just Dance(s) qui correspondent au terme de recherche '${name}'.`;
                res.json({ message: message, data: justDances});
            })
        }
        else {
            JustDance.findAll({ order: [['Id_jeu', 'ASC']] })
            .then(result => {
                const justDances = result.map(justDance => {
                    justDance = justDance.get({ plain: true});
                    delete justDance.types_string;
                    return justDance;
                });
                const message = 'La liste des Just Dances a bien été récupérée.';
                res.json({message: message, data: justDances});
            })
            .catch(error => {
                const message = `La liste des Just Dances n'a pas pu être récupérée. Réesssayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
        }
    });
}