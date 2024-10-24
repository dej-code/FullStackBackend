-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_departmentId_fkey";

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
