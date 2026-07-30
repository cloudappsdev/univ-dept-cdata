import prisma from "../prisma";

export async function getDepartmentById(id: string) {
  return prisma.department.findUnique({
    where: { id },
    include: {
      courses: true,
      instructors: true,
      students: true,
    },
  });
}
