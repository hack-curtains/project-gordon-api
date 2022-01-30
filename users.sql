-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Recipes'
--
-- ---


DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` MEDIUMTEXT NOT NULL,
  `hash` VARCHAR NOT NULL,
  `salt` VARCHAR NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'UserPantry'
--
-- ---

DROP TABLE IF EXISTS `UserPantry`;

CREATE TABLE `UserPantry` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NOT NULL,
  `ingredient_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'UserFavorites'
--
-- ---

DROP TABLE IF EXISTS `UserFavorites`;

CREATE TABLE `UserFavorites` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NOT NULL,
  `recipe_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `UserPantry` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `UserPantry` ADD FOREIGN KEY (ingredient_id) REFERENCES `Ingredients` (`id`);
ALTER TABLE `UserFavorites` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `UserFavorites` ADD FOREIGN KEY (recipe_id) REFERENCES `Recipes` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Recipes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Tags` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `IngredientsToRecipes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `TagsToRecipes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `UserPantry` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `UserFavorites` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Recipes` (`id`,`name`,`description`,`overview`,`steps`,`favorites`,`ratings`,`photo`,`cook_time`,`servings`,`ingredient_list`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `Ingredients` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Tags` (`id`,`name`,`tag_type`) VALUES
-- ('','','');
-- INSERT INTO `IngredientsToRecipes` (`id`,`recipe_id`,`ingredients_string`,`ingredient_id`) VALUES
-- ('','','','');
-- INSERT INTO `TagsToRecipes` (`id`,`recipe_id`,`tag_id`) VALUES
-- ('','','');
-- INSERT INTO `Users` (`id`,`username`,`hash`,`salt`) VALUES
-- ('','','','');
-- INSERT INTO `UserPantry` (`id`,`user_id`,`ingredient_id`) VALUES
-- ('','','');
-- INSERT INTO `UserFavorites` (`id`,`user_id`,`recipe_id`) VALUES
-- ('','','');