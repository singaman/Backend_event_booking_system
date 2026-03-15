import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class Booking extends Model {
    declare id: string;
    declare eventId: string;
    declare customerId: string;
    declare seatsBooked: number;
    declare status: 'confirmed' | 'cancelled';
}

Booking.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        seatsBooked: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.ENUM('confirmed', 'cancelled'),
            allowNull: false,
            defaultValue: 'confirmed',
        },
    },
    {
        sequelize,
        modelName: 'Booking',
        tableName: 'bookings',
    }
);
