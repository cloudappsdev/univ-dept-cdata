import prisma from "../prisma";

export async function getInstructorById(id: string) {
  return prisma.instructor.findUnique({
    where: { id },
    include: {
      department: true,
      sections: {
        include: {
          course: true,
          enrollments: {
            include: {
              student: true,
            },
          },
        },
      },
    },
  });
}
