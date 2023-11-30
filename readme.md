# Inventory Management System API

## Author
- **Author:** Alvi Noor Hossain
- **Email:** alvinoorhossain@gmail.com

## Description
This is a NodeJS, ExpressJS and HTML, CSS project which allows CRUD Operation on the Inventory Management System application.

## Features
- **Create Product:** Add a new product to the inventory.
- **Read Products:** Fetch all products or retrieve a specific product by ID.
- **Update Product:** Modify existing product information.
- **Delete Product:** Remove a product from the inventory.


## Technologies Used
- **HTML, CSS, JS:** This is the front end to extract and show data.
- **JQUERY:** This is the front end library to communicate with the backend server.
- **NodeJS:** NodeJS web framework for backend operations handling.
- **MySQL:** Database management system for storing product data.


## API Endpoints
- `GET /api/products`: Retrieve all products.
- `GET /api/products/:productID`: Get details of a specific product by ID.
- `POST /api/products`: Add a new product to the inventory.
- `PUT /api/products/:productID`: Update details of a specific product.
- `DELETE /api/products/:productID`: Delete a product from the inventory.


## Sample Product JSON
```json
{
	"productName": "F&D Glasses",
	"productDescription": "Bright and blue glasses",
	"price": 85.99,
	"quantity": 12,
	"type": "Watch"
}
```
