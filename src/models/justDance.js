module.exports = (sequelize, DataTypes) => {
    return sequelize.define('JustDance', {
        Id_jeu: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: `Le nom est déjà pris.` }, 
            validate: {
                notEmpty: { msg: `Le nom ne peut pas être vide.` },
                notNull: { msg: `Le nom est une propriété requise.` },
                len: {
                    args: [1, 50],
                    msg: `Le nom doit être composé de 1 à 50 caractères.`
                },
                is: {
                    args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/i,
                    msg: `Le nom ne peut contenir que des caractères numériques, alphabétiques avec ou sans accents, des espaces ou des tirets.`
                }
            }
        },
        Date_sortie: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La date de sortie ne peut pas être vide.` },
                notNull: { msg: `La date de sortie est une propriété requise.` },
                isDate: { msg: `La date de sortie doit être une date valide.` }
            }
        },
        Contient_JD_unlimited: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Contient_JD_unlimited ne peut pas être vide.` },
                notNull: { msg: `La propriété Contient_JD_unlimited est une propriété requise.` },
                isInt: { msg: `La propriété Contient_JD_unlimited doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Contient_JD_unlimited doit être soit 0 soit 1 (0 si le jeu ne contient pas just dance unlimited, 1 si il le contient).`
                }    
            }
        },
        Contient_JD_plus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Contient_JD_plus ne peut pas être vide.` },
                notNull: { msg: `La propriété Contient_JD_plus est une propriété requise.` },
                isInt: { msg: `La propriété Contient_JD_plus doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Contient_JD_plus doit être soit 0 soit 1 (0 si le jeu ne contient pas just dance plus, 1 si il le contient).`
                }    
            }
        }
    });
}