import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class Event extends Model {
    declare id: string;
    declare title: string;
    declare description: string;
    declare date: Date;
    declare totalSeats: number;
    declare availableSeats: number;
    declare organizerId: string;
}

Event.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        totalSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableSeats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        organizerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Event',
        tableName: 'events',
    }
);
