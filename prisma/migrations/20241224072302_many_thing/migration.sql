/*
  Warnings:

  - You are about to drop the column `pic` on the `BannerPic` table. All the data in the column will be lost.
  - You are about to drop the column `pic` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `pic` on the `Review` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `BannerPic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Bucket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WhayUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    CONSTRAINT "WhayUs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyOverView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    CONSTRAINT "CompanyOverView_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bucketId" TEXT,
    CONSTRAINT "Media_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BannerPic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "mediaId" TEXT NOT NULL,
    CONSTRAINT "BannerPic_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BannerPic" ("id", "name") SELECT "id", "name" FROM "BannerPic";
DROP TABLE "BannerPic";
ALTER TABLE "new_BannerPic" RENAME TO "BannerPic";
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "mediaId" TEXT NOT NULL,
    CONSTRAINT "Company_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("id", "link", "name") SELECT "id", "link", "name" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "mediaId" TEXT NOT NULL,
    CONSTRAINT "Review_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("id", "link", "name", "text") SELECT "id", "link", "name", "text" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
