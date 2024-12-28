/*
  Warnings:

  - You are about to drop the column `publish` on the `WhyUs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WhyUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT,
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "WhyUs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WhyUs" ("description", "id", "mediaId") SELECT "description", "id", "mediaId" FROM "WhyUs";
DROP TABLE "WhyUs";
ALTER TABLE "new_WhyUs" RENAME TO "WhyUs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
