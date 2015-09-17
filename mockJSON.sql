CREATE DATABASE  IF NOT EXISTS `mockJSON` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mockJSON`;
-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: mockJSON
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Error_Log`
--

DROP TABLE IF EXISTS `Error_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Error_Log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `errorDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `error` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=348 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Error_Log`
--

LOCK TABLES `Error_Log` WRITE;
/*!40000 ALTER TABLE `Error_Log` DISABLE KEYS */;
/*!40000 ALTER TABLE `Error_Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `notes` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_DataTemplate_Fields`
--

DROP TABLE IF EXISTS `Service_DataTemplate_Fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_DataTemplate_Fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataTemplateId` int(11) NOT NULL,
  `fieldId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=195 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_DataTemplate_Fields`
--

LOCK TABLES `Service_DataTemplate_Fields` WRITE;
/*!40000 ALTER TABLE `Service_DataTemplate_Fields` DISABLE KEYS */;
INSERT INTO `Service_DataTemplate_Fields` VALUES (188,79,193),(187,79,192),(186,79,191),(185,79,190),(184,79,189),(182,79,187),(183,79,188),(189,79,194),(190,79,195),(191,79,196),(192,79,197),(193,79,198),(194,79,199);
/*!40000 ALTER TABLE `Service_DataTemplate_Fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_DataTemplates`
--

DROP TABLE IF EXISTS `Service_DataTemplates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_DataTemplates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `langVar` varchar(5) NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `idCode` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_DataTemplates`
--

LOCK TABLES `Service_DataTemplates` WRITE;
/*!40000 ALTER TABLE `Service_DataTemplates` DISABLE KEYS */;
INSERT INTO `Service_DataTemplates` VALUES (79,'User','en:us',1,2,33,'55fb1c5584423');
/*!40000 ALTER TABLE `Service_DataTemplates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_DataTemplates_SubTemplates`
--

DROP TABLE IF EXISTS `Service_DataTemplates_SubTemplates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_DataTemplates_SubTemplates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataTemplateId` int(11) NOT NULL,
  `childTemplateId` int(11) NOT NULL,
  `objectName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_DataTemplates_SubTemplates`
--

LOCK TABLES `Service_DataTemplates_SubTemplates` WRITE;
/*!40000 ALTER TABLE `Service_DataTemplates_SubTemplates` DISABLE KEYS */;
/*!40000 ALTER TABLE `Service_DataTemplates_SubTemplates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_FieldType`
--

DROP TABLE IF EXISTS `Service_FieldType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_FieldType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_FieldType`
--

LOCK TABLES `Service_FieldType` WRITE;
/*!40000 ALTER TABLE `Service_FieldType` DISABLE KEYS */;
INSERT INTO `Service_FieldType` VALUES (1,'string'),(2,'number'),(3,'date');
/*!40000 ALTER TABLE `Service_FieldType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_Fields`
--

DROP TABLE IF EXISTS `Service_Fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_Fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `typeId` int(11) NOT NULL,
  `options` tinytext NOT NULL,
  `predefinedSampleDataId` int(11) NOT NULL,
  `sampleData` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=200 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_Fields`
--

LOCK TABLES `Service_Fields` WRITE;
/*!40000 ALTER TABLE `Service_Fields` DISABLE KEYS */;
INSERT INTO `Service_Fields` VALUES (190,'birthday',3,'',1,''),(189,'age',2,'',13,''),(188,'PlayingCard',1,'',15,''),(187,'fullName',1,'',4,''),(191,'po ',1,'',5,''),(192,'city',1,'',6,''),(193,'state',1,'',7,''),(194,'country',1,'',8,''),(195,'address',1,'',9,''),(196,'favLetter',1,'',10,''),(197,'para',1,'',11,''),(198,'uname',1,'',12,''),(199,'descr',1,'',14,'fat,skinny');
/*!40000 ALTER TABLE `Service_Fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_Log`
--

DROP TABLE IF EXISTS `Service_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_Log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user` varchar(20) NOT NULL,
  `userAgent` varchar(255) NOT NULL,
  `serviceId` varchar(11) NOT NULL,
  `numberOfRows` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2188 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_Log`
--

LOCK TABLES `Service_Log` WRITE;
/*!40000 ALTER TABLE `Service_Log` DISABLE KEYS */;
/*!40000 ALTER TABLE `Service_Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service_PredefinedSampleData`
--

DROP TABLE IF EXISTS `Service_PredefinedSampleData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Service_PredefinedSampleData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service_PredefinedSampleData`
--

LOCK TABLES `Service_PredefinedSampleData` WRITE;
/*!40000 ALTER TABLE `Service_PredefinedSampleData` DISABLE KEYS */;
INSERT INTO `Service_PredefinedSampleData` VALUES (2,'FirstName'),(3,'LastName'),(4,'Full Name'),(5,'USPostal'),(6,'City'),(7,'State'),(8,'Country'),(9,'AddressOne'),(10,'Letter'),(11,'Lorum'),(12,'UserName'),(13,'Number'),(14,'Custom'),(15,'PlayingCard'),(1,'Date');
/*!40000 ALTER TABLE `Service_PredefinedSampleData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tier`
--

DROP TABLE IF EXISTS `Tier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tier`
--

LOCK TABLES `Tier` WRITE;
/*!40000 ALTER TABLE `Tier` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Meta`
--

DROP TABLE IF EXISTS `User_Meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `value` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Meta`
--

LOCK TABLES `User_Meta` WRITE;
/*!40000 ALTER TABLE `User_Meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Meta_Type`
--

DROP TABLE IF EXISTS `User_Meta_Type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Meta_Type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Meta_Type`
--

LOCK TABLES `User_Meta_Type` WRITE;
/*!40000 ALTER TABLE `User_Meta_Type` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Meta_Type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleInital` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `passWord` varchar(255) NOT NULL,
  `tier` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (33,'john',NULL,'doe','','6ec2af9019e3d77b140162c174dd30e7',0,NULL,'test@gmail.com');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users_Roles`
--

DROP TABLE IF EXISTS `Users_Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users_Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(128) NOT NULL DEFAULT '0',
  `roleId` int(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_Roles`
--

LOCK TABLES `Users_Roles` WRITE;
/*!40000 ALTER TABLE `Users_Roles` DISABLE KEYS */;
INSERT INTO `Users_Roles` VALUES (30,33,2);
/*!40000 ALTER TABLE `Users_Roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-17 17:28:59
