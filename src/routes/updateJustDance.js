const { JustDance } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const authorizedFfields = ['Nom', 'Date_sortie', 'Contient_JD_unlimited', 'Contient_JD_plus'];
const auth = require('../auth/auth');

module.exports = (app) => {
    app.put('/api/justDance/game/:id', auth, (req, res) => {
        const Id_jeu = req.params.id;
        for(const field in req.body) {
            if(!authorizedFfields.includes(field)) {
                const message = `La propriété '${field}' n'ai pas modifiable. Seules les propriétés suivantes le sont : ${authorizedFfields}`;
                return res.status(404).json({message});
            }
        }
        JustDance.update(req.body, {
            where: { Id_jeu: Id_jeu }
        })
        .then( _ => {
            return JustDance.findByPk(Id_jeu).then(result => {
                if(result === null) {
                    const message = `Le jeu demandée n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message});
                }
                const justDance = result.get({ plain: true});
                delete justDance.types_string;
                const message = `Le jeu ${justDance.Nom} a bien modifié.`;
                res.json({message: message, data: justDance});
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
            const message = `le Just Dance n'a pas pu être modifié. Réesayez dans quelques instants.`;
            res.status(500).json({message: message, data: error});
        });
    });
}