# Event Booking System API

A scalable and robust backend API for an Event Booking System, built with Node.js, Express, Sequelize (PostgreSQL), and TypeScript. Featuring background task processing with BullMQ and Redis.

## 🚀 Features

- **User Roles**: Support for `Organizer` and `Customer`.
- **Event Management**: Organizers can create, update, and manage events.
- **Ticket Booking**: Customers can book tickets for available events.
- **Real-time Checks**: Available seats are updated in real-time.
- **Background Tasks**: Booking confirmations and notifications processed via BullMQ & Redis.
- **Input Validation**: Robust prechecks using `express-validator`.
- **API Documentation**: Interactive Swagger UI.
- **Security**: JWT Authentication, Helmet security, and Rate limiting.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: PostgreSQL (Dockerized)
- **Task Queue**: BullMQ & Redis (Dockerized)
- **Documentation**: Swagger/OpenAPI

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Desktop

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:singaman/Backend_event_booking_system.git
   cd Backend_event_booking_system
   ```

2. **Setup Environment**:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5433
   DB_USER=postgres
   DB_PASSWORD=admin_pass
   DB_NAME=event_booking
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1d
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

3. **Start Infrastructure**:
   ```bash
   docker-compose up -d
   ```

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Run the Server**:
   ```bash
   npm run dev
   ```

## 📖 API Documentation

Once the server is running, you can access the interactive API documentation at:
`http://localhost:5000/api-docs`

## 🏗️ Project Structure

- `src/config`: Configuration files (DB, Env).
- `src/controllers`: Request handlers.
- `src/middlewares`: Custom Express middlewares (Auth, Validation).
- `src/models`: Sequelize models.
- `src/routes`: API route definitions.
- `src/services`: Core business logic.
- `src/workers`: Background task workers.
- `src/docs`: Swagger/OpenAPI specs.

## 📄 License

Individual/Internal Use only.
