const { JustDance } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/justDance/game/:id', (req, res) => {
        JustDance.findByPk(req.params.id)
            .then(justDance => {
                if(justDance === null) {
                    const message = `Le Just Dance demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message: message});
                }
                const justDanceResult = justDance.get({ plain: true});
                delete justDanceResult.types_string;
                const message = `Le jeu ${justDance.Nom} a bien été trouvé.`;
                res.json({message: message, data: justDanceResult});
            })
            .catch(error => {
                const message = `Le jeu n'a pas pu être récupéré. Réessayer dans quelques instants`;
                res.status(500).json({message: message, data: error});
            });
    });
}