import prisma from "../prisma";

export async function getSectionById(id: string) {
  return prisma.section.findUnique({
    where: { id },
    include: {
      course: true,
      instructor: true,
      enrollments: {
        include: {
          student: true,
        },
      },
    },
  });
}
