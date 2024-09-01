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
    CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("catagoryId", "description", "id", "name", "primaryImg", "subCategoryId") SELECT "catagoryId", "description", "id", "name", "primaryImg", "subCategoryId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE INDEX "Product_subCategoryId_idx" ON "Product"("subCategoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
