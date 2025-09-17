-- casb_sys_admins
CREATE TABLE `casb_sys_admins` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tm_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tm_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL DEFAULT 0,
  `updated_by` BIGINT NOT NULL DEFAULT 0,
  `memo` VARCHAR(64),
  `user_name` VARCHAR(32) NOT NULL,
  `real_name` VARCHAR(32),
  `password` CHAR(32) NOT NULL,
  `email` VARCHAR(64),
  `phone` CHAR(20),
  `status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `uk_admins_user_name`
  ON `casb_sys_admins` (`user_name`);

-- casb_sys_admins_role
CREATE TABLE `casb_sys_admins_role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tm_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tm_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL DEFAULT 0,
  `updated_by` BIGINT NOT NULL DEFAULT 0,
  `admins_id` BIGINT NOT NULL,
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `uk_admins_role_admins_id`
  ON `casb_sys_admins_role` (`admins_id`, `role_id`);

-- casb_sys_menu
CREATE TABLE `casb_sys_menu` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tm_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tm_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL DEFAULT 0,
  `updated_by` BIGINT NOT NULL DEFAULT 0,
  `status` TINYINT(1) NOT NULL,
  `memo` VARCHAR(64),
  `parent_id` BIGINT NOT NULL,
  `url` VARCHAR(72),
  `name` VARCHAR(32) NOT NULL,
  `sequence` INT NOT NULL,
  `menu_type` TINYINT(1) NOT NULL,
  `code` VARCHAR(32) NOT NULL,
  `icon` VARCHAR(32),
  `operate_type` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `uk_menu_code`
  ON `casb_sys_menu` (`code`);

-- casb_sys_role
CREATE TABLE `casb_sys_role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tm_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tm_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL DEFAULT 0,
  `updated_by` BIGINT NOT NULL DEFAULT 0,
  `memo` VARCHAR(64),
  `name` VARCHAR(32) NOT NULL,
  `sequence` INT NOT NULL,
  `parent_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- casb_sys_role_menu
CREATE TABLE `casb_sys_role_menu` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tm_create` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tm_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` BIGINT NOT NULL DEFAULT 0,
  `updated_by` BIGINT NOT NULL DEFAULT 0,
  `role_id` BIGINT NOT NULL,
  `menu_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `uk_role_menu_role_id`
  ON `casb_sys_role_menu` (`role_id`, `menu_id`);