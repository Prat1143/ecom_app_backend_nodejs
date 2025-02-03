# Backend - E-commerce Application

This is the backend of the E-commerce application built with Node.js and Express. It provides RESTful APIs for managing products and handling cart operations.

## Features

- CRUD operations for products
- Search functionality for products
- Cart management with add, update, and remove functionalities

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- dotenv (for environment variable management)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection string in a `.env` file:

   ```plaintext
   MONGODB_URI=mongodb://<username>:<password>@localhost:27017/<database>
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run on `http://localhost:5000`.

### API Endpoints

- **GET /api/items**: Retrieve all products
- **GET /api/items/:id**: Retrieve a product by ID
- **POST /api/items**: Create a new product
- **PUT /api/items/:id**: Update a product by ID
- **DELETE /api/items/:id**: Delete a product by ID
- **POST /api/cart**: Add/update items in the cart
- **GET /api/cart**: Retrieve cart items

### Running Tests

To run tests, use the following command:
