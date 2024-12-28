-- CreateTable
CREATE TABLE "Factory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "isPublish" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bucketId" TEXT,
    "factoryId" TEXT,
    CONSTRAINT "Media_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Media_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("bucketId", "id", "name", "url") SELECT "bucketId", "id", "name", "url" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
