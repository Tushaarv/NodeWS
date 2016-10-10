-- SET @dbName = "NodeWS5"; 
CREATE DATABASE NodeWS5;

-- Create Database

-- Set Database
USE NodeWS5;

--  Create Employee Table
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL DEFAULT '',
  `profession` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
