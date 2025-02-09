# Restaurant Self-Order System

## Description
The Restaurant Self-Order System is an application designed for restaurants, allowing customers to order food at their tables without the need for a waiter. By scanning a QR code on the table, customers can access a webpage where they can browse the menu, select items, and place an order.

The application consists of two parts:
- **Customer Interface** – Allows users to view the menu, add items to their cart, and place an order.
- **Admin Panel** – Designed for restaurant staff to manage products, categories, users, and track orders.

## Technologies
- **Front-end**: React.js, JavaScript
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB

## Prerequisites
Before installing and running the application, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (which includes npm)

## Installation

### Front-end
```bash
cd frontend
npm install
npm run dev
```

### Back-end
```bash
cd server
npm install
npm run dev
```

## Usage

### Customer Interface
The application is available at: [http://localhost:5173/](http://localhost:5173/).
- To associate an order with a specific table, add the `tableNumber` query parameter to the URL, e.g., `?tableNumber=12`.
- Customers can browse the menu, perform searches, and filter by categories.
- Selected items can be added to the cart, and the "TakeAway" option can be chosen.
- Upon order submission, an order number, item list, total price, and additional notes are displayed.

### Admin Panel
Accessible at: [http://localhost:5173/admin](http://localhost:5173/admin).
- **Login**: Only registered users can access the admin panel.
- **Navigation**:
  - **Products** – View, edit, create, and delete products.
  - **Categories** – Manage categories.
  - **Users** – View and manage registered users.
  - **Orders** – Track and update order statuses.
- Order statuses progress in stages: `Pending -> Approved -> In-Process -> Completed`.
- Orders can be filtered by status.

## Configuration
The front-end requires a `.env` file to function properly. The `.env.example` file contains the required keys without values. The `.env` file is not committed to the git repository.

The back-end requires a `.env` file to function properly. The `.env.example` file contains the required keys without values. The `.env` file is not committed to the git repository.

## Dependencies
All necessary dependencies can be installed using:
```bash
npm install
```
The full list of dependencies is available in the `package.json` files located in `frontend/` and `server/`.

## License
MIT

## Author
Taura Namirskaitė
