/*
  Warnings:

  - You are about to drop the `WhayUs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WhayUs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WhyUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "WhyUs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
