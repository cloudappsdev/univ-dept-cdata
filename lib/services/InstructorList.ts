import prisma from "../prisma";

export async function getInstructors() {
  return prisma.instructor.findMany({
    orderBy: [{ last_name: "asc" }, { first_name: "asc" }],
    include: {
      department: true,
      _count: {
        select: {
          sections: true,
        },
      },
    },
  });
}
