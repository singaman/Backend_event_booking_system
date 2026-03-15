import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class User extends Model {
    declare id: string;
    declare email: string;
    declare password: string;
    declare role: 'organizer' | 'customer';
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('organizer', 'customer'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    }
);
