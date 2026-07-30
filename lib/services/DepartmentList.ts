import prisma from "../prisma";

export async function getDepartments() {
  return prisma.department.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      code: true,
      _count: {
        select: {
          courses: true,
          instructors: true,
          students: true,
        },
      },
    },
  });
}
