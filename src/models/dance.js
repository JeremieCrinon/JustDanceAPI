module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Dance', {
        Id_danse: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Titre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `Le titre ne peut pas être vide.` },
                notNull: { msg: `Le titre est une propriété requise.` },
                len: {
                    args: [1, 50],
                    msg: `Le titre doit être composé de 1 à 50 caractères.`
                }
            }
        },
        Artiste: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `L'artiste ne peut pas être vide.` },
                notNull: { msg: `L'artiste' est une propriété requise.` },
                len: {
                    args: [1, 50],
                    msg: `L'artiste' doit être composé de 1 à 50 caractères.`
                }
            }
        },
        Difficulte: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La difficulte ne peut pas etre vide` },
                notNull: { msg: `La difficulte est une propriété requise.` },
                isIn: {
                    args: [[0, 1, 2, 3]],
                    msg: `La difficulte doit être comprise entre 0 et 3.`
                }
            }
        },
        Version: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La version ne peut pas être vide.` },
                notNull: { msg: `La version est une propriété requise.` },
                len: {
                    args: [1, 50],
                    msg: `La version doit être composé de 1 à 50 caractères.`
                },
                is: {
                    args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/i,
                    msg: `La version ne peut contenir que des caractères numériques, alphabétiques avec ou sans accents, des espaces ou des tirets.`
                }
            }
        },
        Dispo_JD_unlimited: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Dispo_JD_unlimited ne peut pas être vide.` },
                notNull: { msg: `La propriété Dispo_JD_unlimited est une propriété requise.` },
                isInt: { msg: `La propriété Dispo_JD_unlimited doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Dispo_JD_unlimited doit être soit 0 soit 1 (0 si le jeu ne contient pas just dance unlimited, 1 si il le contient).`
                }    
            }
        },
        Dispo_JD_plus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Dispo_JD_plus ne peut pas être vide.` },
                notNull: { msg: `La propriété Dispo_JD_plus est une propriété requise.` },
                isInt: { msg: `La propriété Dispo_JD_plus doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété Dispo_JD_plus doit être soit 0 soit 1 (0 si le jeu ne contient pas just dance plus, 1 si il le contient).`
                }    
            }
        },
        Dispo_jeu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété dispo_jeu ne peut pas être vide.` },
                notNull: { msg: `La propriété dispo_jeu est une propriété requise.` },
                isInt: { msg: `La propriété dispo_jeu doit être un entier.` },
                isIn: {
                    args: [[0, 1]],
                    msg: `La propriété dispo_jeu doit être soit 0 soit 1 (0 si le jeu ne contient pas just dance plus, 1 si il le contient).`
                }    
            }
        },
        VideoLittleSiha: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: `La vidéo de little siha doit être composé de 1 à 255 caractères.`
                }
            }
        },
        Id_jeu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: `La propriété Id_jeu ne peut pas être vide.` },
                notNull: { msg: `La propriété Id_jeu est une propriété requise.` },
                isInt: { msg: `La propriété Id_jeu doit être un entier.` }
            }
        }
    });
}