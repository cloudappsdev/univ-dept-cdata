import prisma from "../prisma";

export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: {
      department: true,
      sections: {
        include: {
          instructor: true,
        },
      },
    },
  });
}
