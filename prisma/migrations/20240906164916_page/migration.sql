-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_name_key" ON "Page"("name");
