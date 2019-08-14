-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 14, 2019 at 09:00 AM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ratemyday`
--

-- --------------------------------------------------------

--
-- Table structure for table `friendship`
--

CREATE TABLE `friendship` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friendship`
--

INSERT INTO `friendship` (`id`, `user_id`, `friend_id`, `status`) VALUES
(1, 2, 4, 2),
(2, 4, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `personal-rating`
--

CREATE TABLE `personal-rating` (
  `id` int(11) NOT NULL,
  `user-id` int(11) NOT NULL,
  `rating` double NOT NULL,
  `avg-pubic-rate` tinyint(1) DEFAULT NULL,
  `reasons` text,
  `timestamp` datetime NOT NULL,
  `public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personal-rating`
--

INSERT INTO `personal-rating` (`id`, `user-id`, `rating`, `avg-pubic-rate`, `reasons`, `timestamp`, `public`) VALUES
(1, 1, 5.6, NULL, NULL, '2019-08-12 06:19:16', 0);

-- --------------------------------------------------------

--
-- Table structure for table `public-rating`
--

CREATE TABLE `public-rating` (
  `id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `friend_rating` double NOT NULL,
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `public-rating`
--

INSERT INTO `public-rating` (`id`, `friend_id`, `friend_rating`, `comment`) VALUES
(1, 2, 9, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user-credentials`
--

CREATE TABLE `user-credentials` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user-credentials`
--

INSERT INTO `user-credentials` (`id`, `username`, `email`, `phone`, `password`) VALUES
(1, 'baohong', 'bao_mu2012@yaho.com.vno', '3214408998', '3215216546'),
(2, 'hong98', 'baohong@knights.ucf.edu', NULL, 'hfdghfdg'),
(3, 'shawn20', 'hhh@hhh.com', NULL, 'baohaohds'),
(4, 'kimlol', 'linhnguyen1970@gmail.com', '3214408647', 'sadasd');

-- --------------------------------------------------------

--
-- Table structure for table `user-info`
--

CREATE TABLE `user-info` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user-info`
--

INSERT INTO `user-info` (`id`, `firstname`, `lastname`, `gender`, `dateofbirth`) VALUES
(1, 'Bao', 'Hong', 'Male', '1998-01-01'),
(2, 'Bao', 'Lol', 'male', '1995-08-12'),
(3, 'Shawn', 'Sherm', 'Male', '2019-08-07'),
(4, 'Kim', 'Hong', 'Female', '2001-11-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friendship`
--
ALTER TABLE `friendship`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Indexes for table `personal-rating`
--
ALTER TABLE `personal-rating`
  ADD UNIQUE KEY `id_2` (`id`),
  ADD KEY `id` (`user-id`);

--
-- Indexes for table `public-rating`
--
ALTER TABLE `public-rating`
  ADD KEY `id` (`id`);

--
-- Indexes for table `user-credentials`
--
ALTER TABLE `user-credentials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `user-info`
--
ALTER TABLE `user-info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friendship`
--
ALTER TABLE `friendship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal-rating`
--
ALTER TABLE `personal-rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user-credentials`
--
ALTER TABLE `user-credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friendship`
--
ALTER TABLE `friendship`
  ADD CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user-info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user-info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `personal-rating`
--
ALTER TABLE `personal-rating`
  ADD CONSTRAINT `personal-rating_ibfk_1` FOREIGN KEY (`user-id`) REFERENCES `user-info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `public-rating`
--
ALTER TABLE `public-rating`
  ADD CONSTRAINT `public-rating_ibfk_1` FOREIGN KEY (`id`) REFERENCES `personal-rating` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user-info`
--
ALTER TABLE `user-info`
  ADD CONSTRAINT `user-info_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user-credentials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
