export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}

export interface EventResponse {
    id: string;
    title: string;
    description: string;
    date: Date;
    totalSeats: number;
    availableSeats: number;
    organizerId: string;
}

export interface BookingResponse {
    id: string;
    eventId: string;
    customerId: string;
    seatsBooked: number;
    status: string;
    event?: EventResponse;
}
