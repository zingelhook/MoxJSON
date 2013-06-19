/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Version : 50520
 Source Host           : localhost
 Source Database       : mockJSON

 Target Server Version : 50520
 File Encoding         : utf-8

 Date: 06/07/2013 18:09:21 PM
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
--  Records of `Role`
-- ----------------------------
BEGIN;
INSERT INTO `Role` VALUES ('1', 'Admin', 'Site Admin'), ('2', 'Customer', 'Registered user of the site.');
COMMIT;

-- ----------------------------
--  Table structure for `Service_DataTemplate_Fields`
-- ----------------------------
DROP TABLE IF EXISTS `Service_DataTemplate_Fields`;
CREATE TABLE `Service_DataTemplate_Fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataTemplateId` int(11) NOT NULL,
  `fieldId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=172 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `Service_DataTemplate_Fields`
-- ----------------------------
BEGIN;
INSERT INTO `Service_DataTemplate_Fields` VALUES ('149', '59', '154'), ('2', '1', '2'), ('6', '4', '11'), ('36', '14', '41'), ('29', '12', '34'), ('30', '12', '35'), ('31', '13', '36'), ('32', '13', '37'), ('33', '13', '38'), ('37', '14', '42'), ('38', '14', '43'), ('39', '14', '44'), ('40', '14', '45'), ('41', '14', '46'), ('42', '14', '47'), ('43', '14', '48'), ('44', '14', '49'), ('45', '14', '50'), ('47', '15', '52'), ('48', '15', '53'), ('49', '15', '54'), ('50', '15', '55'), ('51', '15', '56'), ('52', '16', '57'), ('53', '16', '58'), ('54', '16', '59'), ('55', '16', '60'), ('56', '16', '61'), ('57', '16', '62'), ('58', '16', '63'), ('60', '16', '65'), ('68', '17', '73'), ('69', '17', '74'), ('70', '17', '75'), ('71', '17', '76'), ('72', '17', '77'), ('73', '17', '78'), ('170', '73', '175'), ('84', '18', '89'), ('85', '19', '90'), ('86', '19', '91'), ('92', '0', '97'), ('93', '28', '98'), ('94', '28', '99'), ('101', '31', '106'), ('102', '31', '107'), ('104', '33', '109'), ('105', '37', '110'), ('106', '38', '111'), ('119', '39', '124'), ('120', '41', '125'), ('121', '41', '126'), ('124', '41', '129'), ('123', '41', '128'), ('125', '41', '130'), ('126', '0', '131'), ('127', '42', '132'), ('129', '0', '134'), ('130', '45', '135'), ('131', '46', '136'), ('132', '47', '137'), ('134', '48', '139'), ('135', '49', '140'), ('136', '49', '141'), ('137', '0', '142'), ('138', '50', '143'), ('139', '0', '144'), ('140', '51', '145'), ('141', '0', '146'), ('142', '52', '147'), ('143', '53', '148'), ('144', '54', '149'), ('145', '55', '150'), ('146', '56', '151'), ('147', '57', '152'), ('148', '58', '153'), ('150', '60', '155'), ('153', '65', '158'), ('169', '72', '174'), ('168', '72', '173'), ('157', '68', '162'), ('158', '68', '163'), ('159', '68', '164'), ('160', '69', '165'), ('161', '13', '166'), ('162', '70', '167'), ('163', '70', '168'), ('164', '70', '169'), ('165', '70', '170'), ('166', '71', '171'), ('167', '71', '172'), ('171', '74', '176');
COMMIT;

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
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `Service_DataTemplates`
-- ----------------------------
BEGIN;
INSERT INTO `Service_DataTemplates` VALUES ('12', '2 Playing Cards', 'en-us', '1', '1', '2', '12'), ('13', 'Card Players', 'en-us', '4', '4', '2', '13'), ('14', 'Aclara-Meters', 'en-us', '1', '25', '2', '14'), ('15', 'PowerDownCountData', 'en-us', '5', '60', '2', '15'), ('16', 'ThreePhase', 'en-us', '5', '40', '2', '16'), ('17', 'TBM-Info', 'en:us', '1', '15', '2', '17'), ('72', 'Grades', 'en:us', '1', '20', '2', '51b14ac82af99'), ('68', 'EHIVehicle', 'en:us', '1', '10', '2', '517193cf6b2cf'), ('69', 'EHIFeatures', 'en:us', '1', '5', '2', '5171948a1671e'), ('73', 'car', 'en:us', '1', '2', '2', '51b1ea027ef37'), ('70', 'Address', 'en:us', '1', '1', '2', '51b13c8721ce3'), ('71', 'CorpPerson', 'en:us', '1', '10', '2', '51b13cdaaf8ce'), ('74', 'features', 'en:us', '1', '3', '2', '51b1ea35417e8');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `Service_DataTemplates_SubTemplates`
-- ----------------------------
BEGIN;
INSERT INTO `Service_DataTemplates_SubTemplates` VALUES ('18', '13', '16', 'ThreePhase'), ('19', '12', '17', 'TBM-Info'), ('24', '73', '74', 'features'), ('25', '71', '72', 'Grades'), ('26', '71', '73', 'car'), ('27', '71', '70', 'Address');
COMMIT;

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
--  Records of `Service_FieldType`
-- ----------------------------
BEGIN;
INSERT INTO `Service_FieldType` VALUES ('1', 'string'), ('2', 'date'), ('3', 'int');
COMMIT;

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
) ENGINE=MyISAM AUTO_INCREMENT=177 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `Service_Fields`
-- ----------------------------
BEGIN;
INSERT INTO `Service_Fields` VALUES ('154', 'yoyoma', '1', '', '1', ''), ('155', 'asasd', '1', '', '1', ''), ('2', 'sales', '1', '', '13', ''), ('38', 'Chips', '1', '', '13', '5-500'), ('11', 'FirstName', '1', '', '8', ''), ('41', 'AccountNumber', '1', '{     \"length\": \"10\"}', '13', ''), ('34', 'CardOne', '1', '', '15', ''), ('35', 'CardTwo', '1', '', '15', ''), ('36', 'FirstName', '1', '', '2', ''), ('37', 'LastName', '1', '', '3', ''), ('42', 'ServiceType', '1', '', '14', 'Electric,Gas,Water'), ('43', 'CommType', '1', '', '14', 'Star, TWACS'), ('44', 'MeterNumber', '1', '{     \"length\": \"10\",     \"prepend\": \"w-\"}', '13', ''), ('45', 'Premise', '1', '{     \"length\": \"12\",     \"preappend\": \"p-\"}', '13', ''), ('46', 'CommSerial', '1', '{     \"length\": \"8\" }', '13', ''), ('47', 'Location', '1', '{     \"length\": \"10\",     \"prepend\": \"Premise-\" }', '13', ''), ('48', 'Cycle', '1', '{ \"length\": \"2\" }', '13', ''), ('49', 'RouteId', '1', '{     \"length\": \"2\",     \"prepend\": \"route \" }', '13', ''), ('50', 'MeterType', '1', '', '14', 'UMT_RF_2.x,Gas,Water'), ('52', 'FromDate', '1', '', '14', '01/01/2011,01/02/2011'), ('53', 'ToDate', '1', '', '14', '01/01/2011,01/02/2011'), ('54', 'PowerDownDelta', '1', '', '14', '0,0,5,10,3,8,4,6,7,11'), ('55', 'ElapsedTime', '1', '', '14', '1 day 0:10:37,1 day 00:00:00'), ('56', 'PowerDownCount', '1', '', '13', ''), ('57', 'DateTime', '1', '{\"format\":\"mm/dd/yyyy hh:mm::ss\"}', '1', '01/01/2001 00:10:17,01/01/2001 01:20:17'), ('58', 'VoltagePhaseA', '1', '{ \"length\": \"3\" }', '13', ''), ('59', 'PhaseANom', '1', '{ \"length\": \"3\" }', '13', ''), ('60', 'VoltagePhaseB', '1', '{ \"length\": \"3\" }', '13', ''), ('61', 'PhaseBNom', '1', '{ \"length\": \"3\" }', '13', ''), ('62', 'VoltagePhaseC', '1', '{ \"length\": \"3\" }', '13', ''), ('63', 'PhaseCNom', '1', '{ \"length\": \"3\" }', '13', ''), ('65', 'Address', '1', '', '9', ''), ('73', 'Date', '1', '', '1', ''), ('74', 'SamplingRate', '1', '', '13', ''), ('75', 'Background', '1', '', '13', ''), ('76', 'Tempature', '1', '', '13', ''), ('174', 'grade', '1', '', '13', ''), ('77', 'Pressure', '1', '', '13', ''), ('78', 'Device', '1', '', '11', ''), ('89', 'vvvv', '1', '', '1', ''), ('90', 'one', '1', '', '2', ''), ('91', 'two', '1', '', '8', ''), ('92', '0', '1', '0', '3', '0'), ('93', '0', '1', '0', '1', '0'), ('94', '11', '1', '22', '2', '33'), ('95', 'sdsd', '1', 'sdsd', '1', 'sdsd'), ('96', 'dssd', '1', 'sdsd', '3', 'sdsd'), ('97', 'sss', '1', 'ss', '1', 'ss'), ('98', 'asas', '1', 'asa', '1', 'asas'), ('99', 'dsd', '1', 'ddd', '1', 'ddd'), ('106', 'one', '1', '', '14', 'kevin,terry,paul'), ('107', 'qq', '1', '', '1', ''), ('109', 'dsdcsd', '1', 'sdvsdv', '1', ''), ('110', 'sss', '1', '', '2', ''), ('111', 'name', '1', '', '8', ''), ('124', 'q', '1', '', '1', ''), ('125', 'firstname', '1', '', '2', ''), ('126', 'lastname', '1', '', '3', ''), ('129', 'role', '1', '', '11', ''), ('128', 'birthday', '1', '', '1', ''), ('130', 'dept', '1', '', '11', ''), ('131', 'we', '1', '', '1', ''), ('132', 'e', '1', '', '1', ''), ('133', '1', '1', '', '1', ''), ('134', '11', '1', '', '2', ''), ('135', 's', '1', '', '1', ''), ('136', '12', '1', '', '1', ''), ('137', 'wedwde', '1', '', '1', ''), ('138', 'sqws', '1', '', '1', ''), ('139', 'sss', '1', '', '1', ''), ('140', 'wewe', '1', '', '1', ''), ('141', 'wefwefw', '1', '', '1', ''), ('142', '22', '1', '', '1', ''), ('143', '12', '1', '', '5', ''), ('144', 'qwdq', '1', '', '1', ''), ('145', 'ascadcdc', '1', '', '1', ''), ('146', 'qedwed', '1', '', '1', ''), ('147', 'ewde', '1', '', '1', ''), ('148', '221', '1', '', '1', ''), ('149', '123', '1', '', '1', ''), ('150', 'wqsqws', '1', '', '1', ''), ('151', 'qwsq', '1', '', '1', ''), ('152', '223', '1', '', '1', ''), ('153', 'testf', '1', '', '1', ''), ('158', '22', '1', '', '1', ''), ('173', 'code', '1', '', '11', ''), ('162', 'code', '1', '', '11', ''), ('163', 'description', '1', '', '11', ''), ('164', 'on_request', '1', '', '14', 'true,false'), ('165', 'name', '1', '', '11', ''), ('166', 'kevin', '1', '', '4', ''), ('167', 'address1', '1', '', '9', ''), ('168', 'city', '1', '', '6', ''), ('169', 'state', '1', '', '7', ''), ('170', 'zip', '1', '', '5', ''), ('171', 'firstname', '1', '', '2', ''), ('172', 'lastname', '1', '', '3', ''), ('175', 'name', '1', '', '14', 'Honda,Ford'), ('176', 'name', '1', '', '11', '');
COMMIT;

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
--  Records of `Service_Log`
-- ----------------------------
BEGIN;
INSERT INTO `Service_Log` VALUES ('2183', '2013-02-18 20:19:36', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '67', '3'), ('2184', '2013-02-18 20:19:37', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '67', '2'), ('2185', '2013-04-24 21:12:55', 'user', 'Rested/1988 CFNetwork/596.3.3 Darwin/12.3.0 (x86_64) (MacBookPro9%2C1)', '13', '4'), ('2186', '2013-04-24 21:37:37', 'user', 'Rested/1988 CFNetwork/596.3.3 Darwin/12.3.0 (x86_64) (MacBookPro9%2C1)', '13', '4'), ('2187', '2013-04-24 21:38:38', 'user', 'Rested/1988 CFNetwork/596.3.3 Darwin/12.3.0 (x86_64) (MacBookPro9%2C1)', '13', '4'), ('2167', '2013-02-18 19:56:27', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '1'), ('2168', '2013-02-18 19:56:29', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '1'), ('2169', '2013-02-18 19:56:51', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '3'), ('2170', '2013-02-18 19:56:53', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2171', '2013-02-18 19:56:53', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2172', '2013-02-18 19:56:54', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2173', '2013-02-18 20:01:00', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '3'), ('2174', '2013-02-18 20:03:27', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2175', '2013-02-18 20:03:28', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2176', '2013-02-18 20:03:29', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '3'), ('2177', '2013-02-18 20:03:29', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2178', '2013-02-18 20:03:30', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '1'), ('2179', '2013-02-18 20:03:31', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '3'), ('2180', '2013-02-18 20:03:59', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2'), ('2181', '2013-02-18 20:04:35', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '3'), ('2182', '2013-02-18 20:04:37', 'user', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '5122d4162b8', '2');
COMMIT;

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
--  Records of `Service_PredefinedSampleData`
-- ----------------------------
BEGIN;
INSERT INTO `Service_PredefinedSampleData` VALUES ('1', 'Date'), ('2', 'FirstName'), ('3', 'LastName'), ('4', 'Full Name'), ('5', 'USPostal'), ('6', 'City'), ('7', 'State'), ('8', 'Country'), ('9', 'AddressOne'), ('10', 'Letter'), ('11', 'Lorum'), ('12', 'UserName'), ('13', 'Number'), ('14', 'Custom'), ('15', 'PlayingCard');
COMMIT;

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
--  Records of `Tier`
-- ----------------------------
BEGIN;
INSERT INTO `Tier` VALUES ('1', 'Free'), ('2', 'Admin'), ('3', 'One');
COMMIT;

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
--  Records of `User_Meta_Type`
-- ----------------------------
BEGIN;
INSERT INTO `User_Meta_Type` VALUES ('1', 'Email'), ('2', 'Address'), ('3', 'Phone');
COMMIT;

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
--  Records of `Users`
-- ----------------------------
BEGIN;
INSERT INTO `Users` VALUES ('1', 'joe ', '', 'Cheapo', 'jcheap', '1a1dc91c907325c69271ddf0c944bc72', '1', '', ''), ('2', 'Kevin', '', 'Gaddy', 'kgaddy', 'cba72d6155da1cd11f26974dd686e7cc', '0', 'Owner', 'kevin.gaddy@gmail.com'), ('3', 'andrea', null, 'gaddy', 'agaddy', '32250170a0dca92d53ec9624f336ca24', '0', null, ''), ('7', 'Bill', null, 'Biv', 'billBiv', '1a1dc91c907325c69271ddf0c944bc72', '0', null, ''), ('8', 'the', null, 'dude', 'thedude', 'e807f1fcf82d132f9bb018ca6738a19f', '0', null, ''), ('9', 'Roxane', null, 'Clayton', 'roxane', '25f9e794323b453885f5181f1b624d0b', '0', null, ''), ('10', 'Roxane', null, 'Clayton', 'roxane', '25f9e794323b453885f5181f1b624d0b', '0', null, ''), ('11', 'Roxane', null, 'Clayton', 'roxane', '25f9e794323b453885f5181f1b624d0b', '0', null, ''), ('12', 'asda', null, 'asdas', 'kgaddy2', '25d55ad283aa400af464c76d713c07ad', '0', null, ''), ('13', 'qwew', null, 'qweqe', 'adasssss', '25d55ad283aa400af464c76d713c07ad', '0', null, ''), ('14', 'asccs', null, 'dscsd', 'sdd2', '25d55ad283aa400af464c76d713c07ad', '0', null, ''), ('15', 'sdsd', null, 'sdsds', 'efdwe', '25f9e794323b453885f5181f1b624d0b', '0', null, ''), ('31', 'billybob', null, 'Doe', 'bbdoe', '81dc9bdb52d04dc20036dbd8313ed055', '0', null, ''), ('32', 'wewe', null, 'sdcsdc', '', '81dc9bdb52d04dc20036dbd8313ed055', '0', null, 'kevin.gaeddy@gmail.com');
COMMIT;

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

-- ----------------------------
--  Records of `Users_Roles`
-- ----------------------------
BEGIN;
INSERT INTO `Users_Roles` VALUES ('1', '2', '1'), ('2', '1', '2'), ('3', '5', '1'), ('4', '7', '2'), ('5', '8', '2'), ('6', '9', '2'), ('7', '10', '2'), ('8', '11', '2'), ('9', '12', '2'), ('10', '13', '2'), ('11', '14', '2'), ('12', '15', '2'), ('13', '16', '2'), ('14', '17', '2'), ('15', '18', '2'), ('16', '19', '2'), ('17', '20', '2'), ('18', '21', '2'), ('19', '22', '2'), ('20', '23', '2'), ('21', '24', '2'), ('22', '25', '2'), ('23', '26', '2'), ('24', '27', '2'), ('25', '28', '2'), ('26', '29', '2'), ('27', '30', '2'), ('28', '31', '2'), ('29', '32', '2');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
