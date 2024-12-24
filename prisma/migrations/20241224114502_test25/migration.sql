-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "mediaId" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Company_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("id", "link", "mediaId", "name") SELECT "id", "link", "mediaId", "name" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE TABLE "new_WhayUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "WhayUs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WhayUs" ("description", "id", "mediaId") SELECT "description", "id", "mediaId" FROM "WhayUs";
DROP TABLE "WhayUs";
ALTER TABLE "new_WhayUs" RENAME TO "WhayUs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
