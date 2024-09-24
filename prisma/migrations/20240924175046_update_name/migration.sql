/*
  Warnings:

  - You are about to drop the column `image_report` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `link_report` on the `Test` table. All the data in the column will be lost.
  - Added the required column `image` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Test` DROP COLUMN `image_report`,
    DROP COLUMN `link_report`,
    ADD COLUMN `image` JSON NOT NULL,
    ADD COLUMN `link` JSON NOT NULL;
