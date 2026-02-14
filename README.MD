# COLORS – LAMP Stack Web Application

## Description
COLORS is a full-stack web application built using the LAMP stack (Linux, Apache, MySQL, PHP).
The application allows users to log in and manage a personal list of colors. After authentication, a user can add colors to their account and search for previously stored colors.

The project demonstrates communication between a browser front-end and backend PHP API endpoints, which query a MySQL database and return JSON responses.

---

## Technologies Used
- Linux / Ubuntu Server
- Apache Web Server
- MySQL Database
- PHP (Backend API)
- HTML / CSS / JavaScript (Frontend)
- JSON data exchange
- MD5 hashing for passwords

---

## Project Structure
colors-lamp/
  api/            -> PHP backend endpoints
  public/         -> Frontend website files
    index.html
    css/
    js/
    images/
  README.md
  LICENSE.md
  .gitignore

---

## High-Level Setup Instructions

1. Install a LAMP stack (Linux, Apache, MySQL, PHP)
2. Place the project folder inside your web server directory
   Example:
   /var/www/html/colors-lamp

3. Create the MySQL database:

CREATE DATABASE COP4331;
USE COP4331;

CREATE TABLE Users (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  Login VARCHAR(50),
  Password VARCHAR(50)
);

CREATE TABLE Colors (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50),
  UserID INT
);

4. Create the configuration file

Copy:
api/db_config.example.php → api/db_config.php

Then enter your database credentials inside db_config.php.

---

## How to Run and Access the Application

1. Start Apache and MySQL
2. Open a browser
3. Navigate to:

http://localhost/colors-lamp/public

The login page will load and the application will communicate with the PHP API.

API endpoints:
- /api/Login.php
- /api/AddColor.php
- /api/SearchColors.php

---

## Assumptions and Limitations
- The application assumes MySQL is locally accessible
- Designed for instructional/educational use only
- No HTTPS or production-level security implemented
- Password hashing uses MD5 (not secure for production systems)
- Database must be manually created before running

---

## AI Usage
AI tools were used to assist with documentation wording.