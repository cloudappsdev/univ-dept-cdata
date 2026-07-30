import prisma from "../prisma";

export async function getStudentById(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: {
      major_department: true,
      enrollments: {
        include: {
          section: {
            include: {
              course: true,
              instructor: true,
            },
          },
        },
      },
    },
  });
}
