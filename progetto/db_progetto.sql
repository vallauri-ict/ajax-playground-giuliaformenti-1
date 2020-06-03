-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 03, 2020 alle 19:48
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_progetto`
--
CREATE DATABASE IF NOT EXISTS `db_progetto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_progetto`;

-- --------------------------------------------------------

--
-- Struttura della tabella `brands`
--

CREATE TABLE `brands` (
  `cBrands` int(11) NOT NULL,
  `marca` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `brands`
--

INSERT INTO `brands` (`cBrands`, `marca`) VALUES
(2, 'Adidas'),
(5, 'Champion'),
(1, 'Nike'),
(6, 'Puma'),
(4, 'Reebok'),
(3, 'Vans');

-- --------------------------------------------------------

--
-- Struttura della tabella `modelli`
--

CREATE TABLE `modelli` (
  `cModello` int(11) NOT NULL,
  `nomeModello` varchar(40) NOT NULL,
  `cMarca` int(11) NOT NULL,
  `genere` varchar(7) NOT NULL,
  `prezzo` decimal(10,2) NOT NULL,
  `cUtente` int(11) NOT NULL,
  `sconto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `modelli`
--

INSERT INTO `modelli` (`cModello`, `nomeModello`, `cMarca`, `genere`, `prezzo`, `cUtente`, `sconto`) VALUES
(1, 'zoom 2k', 1, 'uomo', '89.90', 4, '69.90'),
(2, 'm2k tekno', 1, 'donna', '99.99', 1, '89.99'),
(3, 'stan smith', 2, 'bambino', '64.99', 2, '60.00'),
(5, 'superstar', 2, 'uomo', '89.00', 6, '75.00'),
(6, 'nmd', 2, 'bambino', '130.90', 6, '90.95'),
(7, 'ozweego', 2, 'uomo', '120.99', 1, '100.00'),
(8, 'falcon', 2, 'donna', '99.99', 5, '89.90'),
(9, 'magmur', 2, 'donna', '119.99', 2, '99.99'),
(10, 'rivarly', 2, 'donna', '89.99', 5, '80.99'),
(11, 'continental 80', 2, '', '64.99', 6, '49.99'),
(12, 'nite jogger', 2, 'bambino', '99.99', 2, '59.99'),
(13, 'air max 720', 1, 'uomo', '189.99', 1, '159.99'),
(14, 'air vapormax plus', 1, 'uomo', '209.99', 6, '189.99'),
(15, 'air max verona', 1, 'donna', '119.99', 5, '109.99'),
(16, 'tuned', 1, 'donna', '169.99', 2, '129.99'),
(17, 'air force 1', 1, 'bambino', '54.99', 1, '49.99'),
(18, 'blazer', 1, 'bambino', '69.99', 5, '60.00'),
(19, 'slip on', 3, 'uomo', '79.99', 2, '59.99'),
(20, 'sport', 3, 'uomo', '79.99', 5, '70.99'),
(21, 'old skool', 3, 'uomo', '89.99', 6, '75.99');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `cUtente` int(11) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`cUtente`, `nome`, `mail`, `telefono`, `password`) VALUES
(1, 'Gabriele Rosso', 'mail@mail.com', '3495327197', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'Marco Piantini', 'miamail@mail.com', '3658723461', '5f4dcc3b5aa765d61d8327deb882cf99'),
(4, 'Gabriele', 'miaamail@mail.com', '2374562819', '5f4dcc3b5aa765d61d8327deb882cf99'),
(5, 'Sara', 'unamail@mail.com', '3648264917', '5f4dcc3b5aa765d61d8327deb882cf99'),
(6, 'Luca', 'altramail@mail.com', '5243815364', '5f4dcc3b5aa765d61d8327deb882cf99'),
(9, 'Lorenzo', 'mail1@mail.com', '2974787836', '5f4dcc3b5aa765d61d8327deb882cf99');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`cBrands`),
  ADD UNIQUE KEY `marca` (`marca`);

--
-- Indici per le tabelle `modelli`
--
ALTER TABLE `modelli`
  ADD PRIMARY KEY (`cModello`),
  ADD UNIQUE KEY `nomeModello` (`nomeModello`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`cUtente`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `brands`
--
ALTER TABLE `brands`
  MODIFY `cBrands` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `modelli`
--
ALTER TABLE `modelli`
  MODIFY `cModello` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `cUtente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
