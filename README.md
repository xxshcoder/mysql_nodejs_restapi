
# Node.js REST API with Express and MySQL

This is a sample project demonstrating how to build a REST API using Node.js, Express framework, and MySQL database.

## Prerequisites

Before running this application, make sure you have the following prerequisites installed on your machine:

- Node.js (version 12 or above)
- MySQL database

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   cd <project-directory>
   npm install
   ```

3. Database Configuration:

   - Create a MySQL database and note down the database credentials (host, port, username, password).

   - Update the database configuration in the `.env` file:

     ```
     DB_HOST=<your-database-host>
     DB_DATABASE=<your-database-name>
     DB_USERNAME=<your-database-username>
     DB_PASSWORD=<your-database-password>
     PORT=<port-number>
     ```

4. Run the application:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:<port-number>`.

## API Endpoints

The following API endpoints are available:

- **GET /employees** - Retrieve all employees
- **GET /employees/:id** - Retrieve an employee by ID
- **POST /employees** - Create a new employee
- **PUT /employees/:id** - Update an employee by ID
- **DELETE /employees/:id** - Delete an employee by ID

## Database Connection

The application establishes a connection to the MySQL database using the `mysql` package. The connection configuration can be found in the `index.js` file.

## Controllers

The controllers in the `controllers.js` file handle the logic for each API endpoint. The available controller functions are:

- `postUser` - Create a new employee
- `getUser` - Retrieve all employees
- `getUserById` - Retrieve an employee by ID
- `updateUserById` - Update an employee by ID
- `deleteUserById` - Delete an employee by ID
- `routeOutBound` - Handle 404 errors for undefined routes

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Please note that this README assumes you have a basic understanding of setting up a Node.js application and a MySQL database. If you need further assistance, feel free to ask.