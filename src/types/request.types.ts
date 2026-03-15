export interface CreateEventRequest {
    title: string;
    description: string;
    date: Date;
    totalSeats: number;
}

export interface UpdateEventRequest {
    title?: string;
    description?: string;
    date?: Date;
    totalSeats?: number;
}

export interface BookTicketRequest {
    eventId: string;
    seatsBooked: number;
}

export interface RegisterUserRequest {
    email: string;
    password: string;
    role: 'organizer' | 'customer';
}

export interface LoginRequest {
    email: string;
    password: string;
}
