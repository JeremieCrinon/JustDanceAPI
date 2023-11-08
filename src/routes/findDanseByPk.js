const { Dance } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/justDance/danse/:id', (req, res) => {
        Dance.findByPk(req.params.id)
            .then(dance => {
                if(dance === null) {
                    const message = `La danse demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message: message});
                }
                const danceResult = dance.get({ plain: true});
                delete danceResult.types_string;
                const message = `La danse ${dance.Titre} a bien été trouvé.`;
                res.json({message: message, data: danceResult});
            })
            .catch(error => {
                const message = `La danse n'a pas pu être récupéré. Réessayer dans quelques instants`;
                res.status(500).json({message: message, data: error});
            });
    });
}