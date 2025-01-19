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

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profile_picture_url` varchar(255),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `first_name`, `last_name`, `password`, `email`, `created_at`) VALUES
(1, 'johndoe', 'John', 'Doe', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', 'john.doe@example.com', '2024-02-23 10:00:00'),
(2, 'janedoe', 'Jane', 'Doe', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'jane.doe@example.com', '2024-02-23 10:30:00');

-- --------------------------------------------------------
--
-- Table structure for table `game_progress`
--

CREATE TABLE `game_progress` (
  `progress_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `level_number` int(11) NOT NULL,
  `moves_taken` int(11) NOT NULL,
  `time_taken` TIME NOT NULL,
  `date_played` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_completed` boolean DEFAULT FALSE,
  `num_disks` int(11) NOT NULL,
  `guessed_moves` int(11) NOT NULL,
  `actual_moves` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `game_progress`
--

INSERT INTO `game_progress` (`progress_id`, `user_id`, `level_number`, `moves_taken`, `time_taken`, `date_played`, `is_completed`, `num_disks`, `guessed_moves`, `actual_moves`, `points`) VALUES
(1, 1, 1, 7, '00:05:00', '2024-02-23 11:00:00', TRUE, 3, 7, 7, 100),
(2, 1, 2, 15, '00:08:00', '2024-02-23 11:30:00', TRUE, 4, 16, 15, 90),
(3, 2, 1, 7, '00:06:00', '2024-02-23 12:00:00', TRUE, 3, 8, 7, 80);

-- --------------------------------------------------------
--
-- Table structure for table `user_status`
--

CREATE TABLE `user_status` (
  `status_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_games` int(11) DEFAULT 0,
  `highest_score` int(11) DEFAULT 0,
  `best_accuracy` decimal(5,2) DEFAULT 0.00,
  `most_attempted_disks` int(11) DEFAULT 0,
  `avg_disks_per_game` decimal(5,2) DEFAULT 0.00,
  `skill_level` int(11) DEFAULT 1,
  `last_played_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `game_progress`
--
ALTER TABLE `game_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`status_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `game_progress`
--
ALTER TABLE `game_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_status`
--
ALTER TABLE `user_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_progress`
--
ALTER TABLE `game_progress`
  ADD CONSTRAINT `game_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_status`
--
ALTER TABLE `user_status`
  ADD CONSTRAINT `user_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Additional indexes for better query performance
--
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_game_progress_user ON game_progress(user_id);
CREATE INDEX idx_game_progress_date ON game_progress(date_played);
CREATE INDEX idx_user_status_user ON user_status(user_id);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
