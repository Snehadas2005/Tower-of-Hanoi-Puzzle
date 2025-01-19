-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2024 at 12:43 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hanoi_heights`
--
CREATE DATABASE IF NOT EXISTS `hanoi_heights`;
USE `hanoi_heights`;

-- --------------------------------------------------------
--
-- Table structure for table `users`
--

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO Users (username, first_name, last_name, password_hash, email, profile_picture_url, created_at) VALUES
('alex_gamer', 'Alex', 'Smith', 'hashed_password_123', 'alex.smith@email.com', '/profiles/alex.jpg', '2024-02-23 10:00:00'),
('puzzle_master', 'Sarah', 'Johnson', 'hashed_password_456', 'sarah.j@email.com', '/profiles/sarah.jpg', '2024-02-23 10:30:00'),
('tower_king', 'Mike', 'Brown', 'hashed_password_789', 'mike.brown@email.com', '/profiles/mike.jpg', '2024-02-23 11:00:00');

-- --------------------------------------------------------
--
-- Table structure for table `game_progress`
--

CREATE TABLE GameProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    level_number INT NOT NULL,
    moves_taken INT NOT NULL,
    time_taken TIME NOT NULL,
    date_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    score INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `game_progress`
--

INSERT INTO GameProgress (user_id, level_number, moves_taken, time_taken, date_played, is_completed, score) VALUES
(1, 1, 7, '00:02:30', '2024-02-23 10:15:00', TRUE, 95),
(1, 2, 15, '00:04:45', '2024-02-23 10:30:00', TRUE, 88),
(2, 1, 7, '00:02:15', '2024-02-23 10:45:00', TRUE, 98),
(2, 2, 15, '00:05:00', '2024-02-23 11:00:00', TRUE, 85),
(3, 1, 8, '00:03:00', '2024-02-23 11:15:00', TRUE, 90);

-- --------------------------------------------------------
--
-- Table structure for table `user_status`
--

CREATE TABLE UserStatus (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_games INT DEFAULT 0,
    highest_score INT DEFAULT 0,
    best_accuracy DECIMAL(5,2) DEFAULT 0.00,
    most_attempted_disks INT DEFAULT 0,
    avg_disks_per_game DECIMAL(5,2) DEFAULT 0.00,
    skill_level INT DEFAULT 1,
    last_played_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_status`
--

INSERT INTO UserStatus (user_id, total_games, highest_score, best_accuracy, most_attempted_disks, avg_disks_per_game, skill_level, last_played_at) VALUES
(1, 2, 95, 95.50, 4, 3.50, 2, '2024-02-23 10:30:00'),
(2, 2, 98, 97.00, 4, 3.50, 2, '2024-02-23 11:00:00'),
(3, 1, 90, 90.00, 3, 3.00, 1, '2024-02-23 11:15:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE Users
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `game_progress`
--
ALTER TABLE GameProgress
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_status`
--
ALTER TABLE UserStatus
  ADD PRIMARY KEY (`status_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Additional indexes for better query performance
--
CREATE INDEX idx_user_email ON Users(email);
CREATE INDEX idx_user_username ON Users(username);
CREATE INDEX idx_game_progress_user ON GameProgress(user_id);
CREATE INDEX idx_game_progress_date ON GameProgress(date_played);
CREATE INDEX idx_user_status_user ON UserStatus(user_id);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_progress`
--
ALTER TABLE GameProgress
  ADD CONSTRAINT `game_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`);

--
-- Constraints for table `user_status`
--
ALTER TABLE UserStatus
  ADD CONSTRAINT `user_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
