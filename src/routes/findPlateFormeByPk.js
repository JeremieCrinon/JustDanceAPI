const { PlateForme } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/justDance/console/:id', (req, res) => {
        PlateForme.findByPk(req.params.id)
            .then(plateForme => {
                if(plateForme === null) {
                    const message = `La plate forme demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message: message});
                }
                const plateFormeResult = plateForme.get({ plain: true});
                delete plateFormeResult.types_string;
                const message = `La plate forme ${plateForme.Nom} a bien été trouvé.`;
                res.json({message: message, data: plateFormeResult});
            })
            .catch(error => {
                console.log(error);
                const message = `La plate forme n'a pas pu être récupéré. Réessayer dans quelques instants`;
                res.status(500).json({message: message, data: error});
            });
    });
}