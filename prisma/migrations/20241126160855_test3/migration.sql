/*
  Warnings:

  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ProductTag_productId_tagId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "catagoryId" TEXT,
    "primaryImg" TEXT NOT NULL,
    "subCategoryId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "showInHomePage" BOOLEAN NOT NULL DEFAULT false,
    "tagId" TEXT,
    CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Product_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("catagoryId", "description", "id", "name", "primaryImg", "published", "showInHomePage", "subCategoryId") SELECT "catagoryId", "description", "id", "name", "primaryImg", "published", "showInHomePage", "subCategoryId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE INDEX "Product_subCategoryId_tagId_idx" ON "Product"("subCategoryId", "tagId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
