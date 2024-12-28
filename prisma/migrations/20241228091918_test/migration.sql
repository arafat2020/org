-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BannerPic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "mediaId" TEXT,
    CONSTRAINT "BannerPic_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_BannerPic" ("id", "mediaId", "name") SELECT "id", "mediaId", "name" FROM "BannerPic";
DROP TABLE "BannerPic";
ALTER TABLE "new_BannerPic" RENAME TO "BannerPic";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
