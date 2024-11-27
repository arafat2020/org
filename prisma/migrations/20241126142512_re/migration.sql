/*
  Warnings:

  - You are about to drop the `_ProductTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ProductTags_B_index";

-- DropIndex
DROP INDEX "_ProductTags_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductTags";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "Tag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE INDEX "Tag_productId_idx" ON "Tag"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
