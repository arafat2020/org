-- CreateTable
CREATE TABLE "AboutUs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "mediaId" TEXT,
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AboutUs_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
