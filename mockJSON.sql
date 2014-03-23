/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Version : 50520
 Source Host           : localhost
 Source Database       : mockJSON

 Target Server Version : 50520
 File Encoding         : utf-8

 Date: 03/23/2014 10:11:24 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `Error_Log`
-- ----------------------------
DROP TABLE IF EXISTS `Error_Log`;
CREATE TABLE `Error_Log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `errorDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `error` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=348 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Role`
-- ----------------------------
DROP TABLE IF EXISTS `Role`;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `notes` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_DataTemplate_Fields`
-- ----------------------------
DROP TABLE IF EXISTS `Service_DataTemplate_Fields`;
CREATE TABLE `Service_DataTemplate_Fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataTemplateId` int(11) NOT NULL,
  `fieldId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=175 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_DataTemplates`
-- ----------------------------
DROP TABLE IF EXISTS `Service_DataTemplates`;
CREATE TABLE `Service_DataTemplates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `langVar` varchar(5) NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `idCode` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_DataTemplates_SubTemplates`
-- ----------------------------
DROP TABLE IF EXISTS `Service_DataTemplates_SubTemplates`;
CREATE TABLE `Service_DataTemplates_SubTemplates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataTemplateId` int(11) NOT NULL,
  `childTemplateId` int(11) NOT NULL,
  `objectName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_FieldType`
-- ----------------------------
DROP TABLE IF EXISTS `Service_FieldType`;
CREATE TABLE `Service_FieldType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_Fields`
-- ----------------------------
DROP TABLE IF EXISTS `Service_Fields`;
CREATE TABLE `Service_Fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `typeId` int(11) NOT NULL,
  `options` tinytext NOT NULL,
  `predefinedSampleDataId` int(11) NOT NULL,
  `sampleData` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=180 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_Log`
-- ----------------------------
DROP TABLE IF EXISTS `Service_Log`;
CREATE TABLE `Service_Log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user` varchar(20) NOT NULL,
  `userAgent` varchar(255) NOT NULL,
  `serviceId` varchar(11) NOT NULL,
  `numberOfRows` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2188 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Service_PredefinedSampleData`
-- ----------------------------
DROP TABLE IF EXISTS `Service_PredefinedSampleData`;
CREATE TABLE `Service_PredefinedSampleData` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Tier`
-- ----------------------------
DROP TABLE IF EXISTS `Tier`;
CREATE TABLE `Tier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `User_Meta`
-- ----------------------------
DROP TABLE IF EXISTS `User_Meta`;
CREATE TABLE `User_Meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `value` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `User_Meta_Type`
-- ----------------------------
DROP TABLE IF EXISTS `User_Meta_Type`;
CREATE TABLE `User_Meta_Type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Users`
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
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
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `Users_Roles`
-- ----------------------------
DROP TABLE IF EXISTS `Users_Roles`;
CREATE TABLE `Users_Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(128) NOT NULL DEFAULT '0',
  `roleId` int(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
