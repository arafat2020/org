/*
  Warnings:

  - You are about to drop the `Keycontact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Keycontact";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "KeyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "LinkedInLink" TEXT,
    "twitterLink" TEXT,
    "emailLink" TEXT,
    "faceBookLink" TEXT,
    "speach" TEXT
);
