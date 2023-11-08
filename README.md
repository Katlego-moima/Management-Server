# Employee Management System - Server

This is the server-side of the Employee Management System, built with Node.js, Express.js, MySQL, and JWT authentication.

## Installation

To run this server application, follow these steps:

1. Clone the repository:

   git clone https://github.com/Katlego-moima/Management-Server.git

2. Change directory to the server folder:

   cd employee-management-system-server

3. Install the server dependencies:

   npm install

4. Start the server:

   nodemon

### The server will run on port 3200. Ensure that your MySQL database is set up and running.

## Usage

The server provides various API endpoints for managing employee records and authentication. Below is an overview of the available endpoints and their functionalities:

##### Admin Authentication

1. POST /auth/adminLogin

#### Description: Authenticate an admin user and generate a JWT token for authorization.

##### Request Body:

{
"email": "admin@example.com",
"password": "adminpassword"
}

#### Admin Functionalities

2. GET /auth/category

#### Description: Retrieve a list of all categories.

3. POST /auth/addCategory

#### Description: Add a new category.

##### Request Body:

{
"category": "New Category"
}

4. POST /auth/addEmployee

#### Description: Add a new employee with image upload.

##### Request Body:

Form fields: name, email, salary, image (file), password, address, categoryID 5. GET /auth/employee

#### Description: Retrieve a list of all employees.

6. GET /auth/employee/:id

#### Description: Retrieve a specific employee by ID.

7. PUT /auth/editEmployee/:id

#### Description: Update an existing employee's details.

##### Request Body: Employee details to update.

8. DELETE /auth/deleteEmployee/:id

#### Description: Delete an employee by ID.

9. GET /auth/adminCount

#### Description: Retrieve the count of admin records.

10. GET /auth/employeeCount

#### Description: Retrieve the count of employee records.

11. GET /auth/salaryCount

#### Description: Retrieve the sum of all employee salaries.

12. GET /auth/adminRecords

#### Description: Retrieve a list of all admin records.

13. GET /auth/logout

#### Description: Clear the authentication token for logout.

Employee Authentication 14. POST /employee/employeeLogin

#### Description: Authenticate an employee user and generate a JWT token for authorization.

##### Request Body:

{
"email": "employee@example.com",
"password": "employeepassword"
} 15. GET /employee/detail/:id

#### Description: Retrieve details of an employee by ID.

16. GET /employee/logout
    Description: Clear the authentication token for logout.
