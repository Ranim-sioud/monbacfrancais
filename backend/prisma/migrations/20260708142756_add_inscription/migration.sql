-- CreateTable
CREATE TABLE `Inscription` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pays` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(191) NOT NULL,
    `classe` ENUM('PREMIERE', 'TERMINALE') NOT NULL,
    `specialites` TEXT NOT NULL,
    `message` TEXT NULL,
    `packType` ENUM('MENSUEL', 'ANNUEL') NOT NULL,
    `prixOriginal` DOUBLE NOT NULL,
    `prixFinal` DOUBLE NOT NULL,
    `reduction` DOUBLE NOT NULL DEFAULT 20,
    `status` ENUM('PENDING', 'ACTIVE', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
