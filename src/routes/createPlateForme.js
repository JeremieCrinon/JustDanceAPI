const { ValidationError, UniqueConstraintError } = require('sequelize');
const { PlateForme } = require('../db/sequelize');
const authorizedFields = ['Nom', 'Scorable_mains_libres', 'Scorable_manete', 'Scorable_smartphone'];
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/api/justDance/console', auth, (req, res) => {
        for(const field in req.body) {
            if(!authorizedFields.includes(field)) {
                const message = `La propriété '${field}' n'est pas à définir. Seules les propriétés suivantes le sont : ${authorizedFields}`;
                return res.status(400).json({message});
            }
        }
        PlateForme.create(req.body)
            .then(plateForme => {
                const plateFormeResponse = plateForme.get({ plain: true});
                delete plateFormeResponse.types_string;
                const message = `La plate forme ${plateForme.Nom} a bien été créé.`;
                res.json({message: message, data: plateFormeResponse});
            })
            .catch(error => {
                if( error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if( error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = `La plate forme n'a pas pu être ajouté. Réessayez dans quelques instants.`;
                res.status(500).json({message: message, data: error});
            });
    });
}