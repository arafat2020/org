-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_JobType" ("active", "id", "type") SELECT "active", "id", "type" FROM "JobType";
DROP TABLE "JobType";
ALTER TABLE "new_JobType" RENAME TO "JobType";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
