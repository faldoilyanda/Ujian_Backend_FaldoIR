-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 21, 2018 at 04:49 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank_faldo`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'faldo', '123');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `rekening` int(11) NOT NULL,
  `kode_pin` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `rekening`, `kode_pin`) VALUES
(1, 12345, '12345'),
(4, 123456, '12345');

-- --------------------------------------------------------

--
-- Table structure for table `customer_ditel`
--

CREATE TABLE `customer_ditel` (
  `id` int(11) NOT NULL,
  `nama` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `alamat` varchar(300) NOT NULL,
  `nomor_hp` varchar(300) NOT NULL,
  `gander` varchar(300) NOT NULL,
  `saldo` int(200) NOT NULL,
  `birthday` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_ditel`
--

INSERT INTO `customer_ditel` (`id`, `nama`, `email`, `alamat`, `nomor_hp`, `gander`, `saldo`, `birthday`) VALUES
(1, 'raton', 'raton@gmail.com', 'jl kaki', '0812383838', 'pria', 6594602, '12-02-11'),
(4, 'esa', 'esa@gmail.com', 'jl sender', '0812345678', 'pria', 1504767, '12-12-1990');

-- --------------------------------------------------------

--
-- Table structure for table `history_stortunai`
--

CREATE TABLE `history_stortunai` (
  `id` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `jumlah_stor` varchar(300) NOT NULL,
  `waktu_distor` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history_stortunai`
--

INSERT INTO `history_stortunai` (`id`, `id_customer`, `jumlah_stor`, `waktu_distor`) VALUES
(1, 1, '3063357', '2018-07-20 08:49:19'),
(2, 1, '22000', '2018-07-20 08:49:50'),
(3, 1, '22000', '2018-07-20 08:50:03'),
(4, 1, '2000000', '2018-07-20 09:54:31'),
(5, 1, '2000000', '2018-07-20 09:56:31'),
(6, 4, '20000', '2018-07-20 10:24:24'),
(7, 4, '30000', '2018-07-20 10:24:29'),
(8, 4, '20000', '2018-07-20 10:26:24'),
(9, 4, '30000', '2018-07-20 10:26:29');

-- --------------------------------------------------------

--
-- Table structure for table `history_transfer`
--

CREATE TABLE `history_transfer` (
  `id` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `kerekening` varchar(300) NOT NULL,
  `jumlah_transfer` varchar(200) NOT NULL,
  `waktu_distransfer` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history_transfer`
--

INSERT INTO `history_transfer` (`id`, `id_customer`, `kerekening`, `jumlah_transfer`, `waktu_distransfer`) VALUES
(1, 1, '123456', '3000', '2018-07-20 09:37:45'),
(2, 1, '123456', '1000', '2018-07-20 09:45:14'),
(3, 1, '123456', '1000', '2018-07-20 09:45:35'),
(4, 1, '123456', '1000', '2018-07-20 09:45:36'),
(5, 1, '123456', '1000', '2018-07-20 09:47:14'),
(6, 1, '123456', '1000', '2018-07-20 09:47:35'),
(7, 1, '123456', '1000', '2018-07-20 09:51:26'),
(8, 1, '12345', '123', '2018-07-20 10:10:48'),
(9, 1, '12345', '123', '2018-07-20 10:10:55'),
(10, 1, '123456', '123', '2018-07-20 10:11:55'),
(11, 1, '12345', '123', '2018-07-20 10:12:29'),
(12, 4, '12345', '1233', '2018-07-20 10:22:36'),
(13, 4, '12345', '123', '2018-07-20 10:22:53'),
(14, 4, '12345', '600000', '2018-07-20 10:25:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_ditel`
--
ALTER TABLE `customer_ditel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_stortunai`
--
ALTER TABLE `history_stortunai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_transfer`
--
ALTER TABLE `history_transfer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customer_ditel`
--
ALTER TABLE `customer_ditel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `history_stortunai`
--
ALTER TABLE `history_stortunai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `history_transfer`
--
ALTER TABLE `history_transfer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
