/*
  Warnings:

  - Added the required column `pic` to the `KeyContact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KeyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "LinkedInLink" TEXT,
    "twitterLink" TEXT,
    "emailLink" TEXT,
    "faceBookLink" TEXT,
    "speach" TEXT
);
INSERT INTO "new_KeyContact" ("LinkedInLink", "designation", "emailLink", "faceBookLink", "id", "name", "speach", "twitterLink") SELECT "LinkedInLink", "designation", "emailLink", "faceBookLink", "id", "name", "speach", "twitterLink" FROM "KeyContact";
DROP TABLE "KeyContact";
ALTER TABLE "new_KeyContact" RENAME TO "KeyContact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
