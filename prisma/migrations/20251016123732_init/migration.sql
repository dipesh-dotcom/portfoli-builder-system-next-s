-- CreateTable
CREATE TABLE "languages" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "languages_userId_idx" ON "languages"("userId");

-- AddForeignKey
ALTER TABLE "languages" ADD CONSTRAINT "languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
