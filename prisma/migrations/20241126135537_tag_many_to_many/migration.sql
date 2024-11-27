-- CreateTable
CREATE TABLE "_ProductToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productId" TEXT
);
INSERT INTO "new_Tag" ("id", "name", "productId") SELECT "id", "name", "productId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE INDEX "Tag_productId_idx" ON "Tag"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTag_AB_unique" ON "_ProductToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");
