const { ValidationError, UniqueConstraintError } = require('sequelize');
const { JustDance } = require('../db/sequelize');
const authorizedFields = ['Nom', 'Date_sortie', 'Contient_JD_unlimited', 'Contient_JD_plus'];
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/api/justDance/game', auth, (req, res) => {
        for(const field in req.body) {
            if(!authorizedFields.includes(field)) {
                const message = `La propriété '${field}' n'est pas à définir. Seules les propriétés suivantes le sont : ${authorizedFields}`;
                return res.status(400).json({message});
            }
        }
        JustDance.create(req.body)
            .then(justDance => {
                const justDanceResponse = justDance.get({ plain: true});
                delete justDanceResponse.types_string;
                const message = `Le jeu ${justDance.Nom} a bien été créé.`;
                res.json({message: message, data: justDanceResponse});
            })
            .catch(error => {
                if( error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if( error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = `Le jeu n'a pas pu être ajouté. Réessayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
    });
}