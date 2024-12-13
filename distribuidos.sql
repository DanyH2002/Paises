-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: distribuidos
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(40) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `phone` char(11) NOT NULL,
  `sex` enum('Mujer','Hombre') NOT NULL,
  `birthdate` date DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `email` tinytext NOT NULL,
  `password` char(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','ana maria','luna','4155666288','Mujer','1990-05-21','EEUU','rafaelaguilar200304@gmail.com','123456789RA'),('0441f39a-7bf9-4e19-8f66-31561efb3b03','Daniel','Crisanto','4155666299','Hombre','1968-01-29','Mexico','crisantovictorianodaniel@gmail.com','9876543210'),('1','ana','luna','4155663459','Mujer','1990-05-21','Estados Unidos','ana@gmail.com','1234abvcft77u'),('2','daniela','crisanto','4155666299','Mujer','2002-12-26','Mexico','danielacrisantoluna@gmail.com','12345678CL'),('3','rafael','aguilar','4151673804','Hombre','2003-04-15','Mexico','rafaelaguilar200304@gmail.com','123456789RA'),('43ababbb-1420-4c64-890c-64c0f223e4f6','Hulda Daniela','Crisanto Luna','4155666299','Mujer','2002-12-26','Mexico','danielacrisantoluna@gmail.com','123456789'),('dhcbdjmckd','ana maria','luna','4155666288','Mujer','1990-05-21','EEUU','rafaelaguilar200304@gmail.com','123456789RA'),('e22a1116-9a77-4de8-b5af-1e445af74bf3','Daniela',' Luna','4155666299','Mujer','2002-12-26','Mexico','danielacrisanto26@hotmail.com','123456789'),('f767e5b0-7dc5-42d4-b43f-91570890dae1','Ofelia',' Luna','4155666299','Mujer','1965-04-02','Mexico','ofeluna65@gmail.com','123456789'),('gvbhrenjcf','ana maria','luna','4155666288','Hombre','1990-05-21','EEUU','rafaelaguilar200304@gmail.com','123456789RA');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 22:14:58
