const { ValidationError, UniqueConstraintError } = require('sequelize');
const { Dance } = require('../db/sequelize');
const authorizedFields = ['Titre', 'Artiste', 'Difficulte', 'Version', 'Dispo_JD_unlimited', 'Dispo_JD_plus', 'Dispo_jeu', 'VideoLittleSiha', 'Id_jeu'];
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/api/justDance/danse', auth, (req, res) => {
        for(const field in req.body) {
            if(!authorizedFields.includes(field)) {
                const message = `La propriété '${field}' n'est pas à définir. Seules les propriétés suivantes le sont : ${authorizedFields}`;
                return res.status(400).json({message});
            }
        }
        Dance.create(req.body)
            .then(dance => {
                const danceResponse = dance.get({ plain: true});
                delete danceResponse.types_string;
                const message = `La danse ${dance.Titre} a bien été créé.`;
                res.json({message: message, data: danceResponse});
            })
            .catch(error => {
                if( error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if( error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = `La danse n'a pas pu être ajouté. Réessayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
    });
}