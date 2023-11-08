module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PlateForme', {
        Id_plate_forme: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Le nom ne peut pas être vide.` },
                notNull: { msg: `Le nom est une propriété requise.` },
                len: {
                    args: [1, 50],
                    msg: `Le nom doit être composé de 1 à 50 caractères.`
                }
            }
        },
        Scorable_mains_libres: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Scorable_mains_libres ne peut pas être vide.` },
                notNull: { msg: `La propriété Scorable_mains_libres est une propriété requise.` },
                isInt: { msg: `La propriété Scorable_mains_libres doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Scorable_mains_libres doit être soit 0 soit 1 (0 si la platefores ne permets pas de scorer avec les mains libres, 1 si elle le permets).`
                }    
            }
        },
        Scorable_manete: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Scorable_manete ne peut pas être vide.` },
                notNull: { msg: `La propriété Scorable_manete est une propriété requise.` },
                isInt: { msg: `La propriété Scorable_manete doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Scorable_manete doit être soit 0 soit 1 (0 si la platefores ne permets pas de scorer avec une manete, 1 si elle le permets).`
                }    
            }
        },
        Scorable_smartphone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Scorable_smartphone ne peut pas être vide.` },
                notNull: { msg: `La propriété Scorable_smartphone est une propriété requise.` },
                isInt: { msg: `La propriété Scorable_smartphone doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Scorable_smartphone doit être soit 0 soit 1 (0 si la platefores ne permets pas de score avec un smartphone, 1 si elle le permets).`
                }    
            }
        }
    });
}