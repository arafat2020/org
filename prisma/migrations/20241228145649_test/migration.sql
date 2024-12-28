-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyOverView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT,
    CONSTRAINT "CompanyOverView_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CompanyOverView" ("description", "id", "mediaId") SELECT "description", "id", "mediaId" FROM "CompanyOverView";
DROP TABLE "CompanyOverView";
ALTER TABLE "new_CompanyOverView" RENAME TO "CompanyOverView";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
