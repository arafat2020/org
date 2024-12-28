-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WhayUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "WhayUs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WhayUs" ("description", "id", "mediaId", "publish") SELECT "description", "id", "mediaId", "publish" FROM "WhayUs";
DROP TABLE "WhayUs";
ALTER TABLE "new_WhayUs" RENAME TO "WhayUs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
