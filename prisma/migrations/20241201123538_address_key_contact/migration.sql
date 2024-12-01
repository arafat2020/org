-- CreateTable
CREATE TABLE "Keycontact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "LinkedInLink" TEXT,
    "twitterLink" TEXT,
    "emailLink" TEXT,
    "faceBookLink" TEXT,
    "speach" TEXT
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "house" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
