const { Dance } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/justDance/danse/:id', auth, (req, res) => {
        Dance.findByPk(req.params.id).then(dance => {
            if(dance === null) {
                const message = `La dance demandée n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({message: message});
            } 

            if(dance.Id_danse == 1) {
                const message = `La dance avec l'identifiant n°${req.params.id} ne peut pas être supprimé, elle est trop bien, la musique, les décors, les costumes, la chorée sont parfait, en plus, siha est la coach sur cette dans et elle a parfaitement réussie son travail! Donc tu supprimes pas celle ci!!!`;
                return res.status(403).json({message: message});
            }

            const danceDeleted = dance;
            return Dance.destroy({
                where: { Id_danse: dance.Id_danse }
            })
            .then( _ => {
                const danceResponse = danceDeleted.get({ plain: true});
                delete danceResponse.types_string;
                const message = `La dance avec l'identifiant n°${danceDeleted.Id_danse} a bien été supprimé.`;
                res.json({message: message, data: danceResponse});
            });
        })
        .catch(error => {
            const message = `La danse n'a pas pu être supprimé. Réessayer dans quelques instants`;
            console.log(error);
            res.status(500).json({message: message, data: error});
        });
        
    });
}