-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Sessions`;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `salt` VARCHAR(16) NOT NULL,
  `email` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Sessions'
--
-- ---


CREATE TABLE `Sessions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_Users` INTEGER NOT NULL,
  `cookie` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Sessions` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Sessions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`username`,`password`,`salt`,`email`) VALUES ('1','Blarg','secret','salt data','email data');
-- INSERT INTO `Sessions` (`id`,`id_Users`,`cookie`) VALUES
-- ('','','');