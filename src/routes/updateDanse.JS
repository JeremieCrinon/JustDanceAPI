const { Dance } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const authorizedFfields = ['Titre', 'Artiste', 'Difficulte', 'Version', 'Dispo_JD_unlimited', 'Dispo_JD_plus', 'Dispo_jeu', 'VideoLittleSiha', 'Id_jeu'];
const auth = require('../auth/auth');

module.exports = (app) => {
    app.put('/api/justDance/danse/:id', auth, (req, res) => {
        const Id_danse = req.params.id;
        for(const field in req.body) {
            if(!authorizedFfields.includes(field)) {
                const message = `La propriété '${field}' n'est pas modifiable. Seules les propriétés suivantes le sont : ${authorizedFfields}`;
                return res.status(404).json({message});
            }
        }
        Dance.update(req.body, {
            where: { Id_danse: Id_danse }
        })
        .then( _ => {
            return Dance.findByPk(Id_danse).then(result => {
                if(result === null) {
                    const message = `La danse demandée n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message});
                }
                const dance = result.get({ plain: true});
                delete dance.types_string;
                const message = `La danse ${dance.Titre} a bien modifié.`;
                res.json({message: message, data: dance});
            });
        })
        .catch(error => {
            console.log(error);
            if( error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error});
            }
            if( error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error});
            }
            const message = `La danse n'a pas pu être modifié. Réesayez dans quelques instants.`;
            res.status(500).json({message: message, data: error});
        });
    });
}