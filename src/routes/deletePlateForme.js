const { PlateForme } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.delete('/api/justDance/console/:id', auth, (req, res) => {
        PlateForme.findByPk(req.params.id).then(plateForme => {
            if(plateForme === null) {
                const message = `La plate forme demandée n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({message: message});
            } 

            const plateFormeDeleted = plateForme;
            return PlateForme.destroy({
                where: { Id_plate_forme: plateForme.Id_plate_forme }
            })
            .then( _ => {
                const plateFormeResponse = plateFormeDeleted.get({ plain: true});
                delete plateFormeResponse.types_string;
                const message = `La plate forme avec l'identifiant n°${plateFormeDeleted.Id_plate_forme} a bien été supprimé.`;
                res.json({message: message, data: plateFormeResponse});
            });
        })
        .catch(error => {
            const message = `La plate forme n'a pas pu être supprimé. Réessayer dans quelques instants`;
            console.log(error);
            res.status(500).json({message: message, data: error});
        });
        
    });
}