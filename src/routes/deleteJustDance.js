const { JustDance } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/justDance/game/:id', auth, (req, res) => {
        JustDance.findByPk(req.params.id).then(justDance => {
            if(justDance === null) {
                const message = `Le Just Dance demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({message: message});
            } 

            const justDanceDeleted = justDance;
            return JustDance.destroy({
                where: { Id_jeu: justDance.Id_jeu }
            })
            .then( _ => {
                const justDanceResponse = justDanceDeleted.get({ plain: true});
                delete justDanceResponse.types_string;
                const message = `Le Just Dance avec l'identifiant n°${justDanceDeleted.id} a bien été supprimé.`;
                res.json({message: message, data: justDanceResponse});
            });
        })
        .catch(error => {
            const message = `Le Just Dance n'a pas pu être supprimé. Réessayer dans quelques instants`;
            console.log(error);
            res.status(500).json({message: message, data: error});
        });
        
    });
}