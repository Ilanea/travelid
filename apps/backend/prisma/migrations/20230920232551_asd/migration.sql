/*
  Warnings:

  - You are about to drop the column `refreshTokenHash` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'HOTELMANAGER';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "refreshTokenHash";
