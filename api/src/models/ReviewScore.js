const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('reviewScore', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        eventId: {
            type: DataTypes.UUID,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}