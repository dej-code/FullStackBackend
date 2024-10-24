/*
  Warnings:

  - Made the column `departmentId` on table `Faculty` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_departmentId_fkey";

-- AlterTable
ALTER TABLE "Faculty" ALTER COLUMN "departmentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
