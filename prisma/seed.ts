import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.CAMEL_DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

// -------------------------------------------------
// Static reference data used to generate volume
// -------------------------------------------------

const CS_COURSES = [
  { number: "101", title: "Introduction to Programming", credits: 3, description: "Basics of programming using Python." },
  { number: "150", title: "Discrete Structures", credits: 3, description: "Logic, sets, relations, and proof techniques for computing." },
  { number: "220", title: "Data Structures", credits: 4, description: "Core data structures and their algorithmic use." },
  { number: "250", title: "Computer Organization", credits: 3, description: "Machine architecture, assembly, and memory systems." },
  { number: "310", title: "Operating Systems", credits: 4, description: "Processes, concurrency, scheduling, and memory management." },
  { number: "330", title: "Databases", credits: 3, description: "Relational modeling, SQL, and transaction processing." },
  { number: "370", title: "Computer Networks", credits: 3, description: "Network protocols, architectures, and distributed systems basics." },
  { number: "450", title: "Algorithms", credits: 4, description: "Advanced algorithms and complexity." },
];

const MATH_COURSES = [
  { number: "115", title: "Precalculus", credits: 3, description: "Functions, graphs, and algebraic foundations for calculus." },
  { number: "201", title: "Calculus I", credits: 4, description: "Differential and integral calculus." },
  { number: "202", title: "Calculus II", credits: 4, description: "Techniques of integration, sequences, and series." },
  { number: "225", title: "Linear Algebra", credits: 3, description: "Vector spaces, matrices, and linear transformations." },
  { number: "250", title: "Differential Equations", credits: 3, description: "Ordinary differential equations and modeling." },
  { number: "310", title: "Probability", credits: 3, description: "Probability theory and random variables." },
  { number: "330", title: "Abstract Algebra", credits: 3, description: "Groups, rings, and fields." },
  { number: "410", title: "Real Analysis", credits: 4, description: "Rigorous treatment of limits, continuity, and convergence." },
];

const CS_INSTRUCTORS = [
  { first: "Alice", last: "Smith" },
  { first: "Marcus", last: "Nguyen" },
  { first: "Priya", last: "Rao" },
  { first: "David", last: "Kim" },
];

const MATH_INSTRUCTORS = [
  { first: "Robert", last: "Jones" },
  { first: "Elena", last: "Petrova" },
  { first: "Samuel", last: "Okafor" },
  { first: "Grace", last: "Lin" },
];

const FIRST_NAMES = [
  "John", "Emily", "Michael", "Sarah", "Daniel", "Olivia", "James", "Sophia",
  "William", "Ava", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Amelia",
  "Alexander", "Charlotte", "Ethan", "Harper", "Jacob", "Evelyn", "Noah", "Abigail",
  "Ryan", "Emma", "Nathan", "Grace", "Owen", "Chloe", "Dylan", "Zoey",
  "Caleb", "Lily", "Isaac", "Hannah", "Gabriel", "Addison", "Julian", "Aubrey",
  "Christian", "Ellie", "Adrian", "Natalie", "Wyatt", "Layla", "Eli", "Victoria",
  "Aaron", "Scarlett", "Connor", "Aria", "Landon", "Riley", "Jonathan", "Nora",
  "Cameron", "Savannah", "Jordan", "Brooklyn",
];

const LAST_NAMES = [
  "Doe", "Clark", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson",
  "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin",
  "Thompson", "Garcia", "Martinez", "Robinson", "Lewis", "Walker", "Hall", "Allen",
  "Young", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams",
  "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips",
  "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris",
  "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera",
  "Cooper", "Richardson", "Cox", "Howard",
];

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const SECTION_TIMES = [
  "MWF 9:00–10:00",
  "MWF 10:00–11:00",
  "MWF 11:00–12:00",
  "TTh 9:00–10:30",
  "TTh 10:30–12:00",
  "TTh 1:00–2:30",
  "MWF 1:00–2:00",
  "TTh 2:30–4:00",
];

async function main() {
  // -------------------------
  // Departments
  // -------------------------
  const cs = await prisma.department.create({
    data: { name: "Computer Science", code: "CS" },
  });

  const math = await prisma.department.create({
    data: { name: "Mathematics", code: "MATH" },
  });

  // -------------------------
  // Instructors (4 per department)
  // -------------------------
  const csInstructors = [];
  for (const inst of CS_INSTRUCTORS) {
    csInstructors.push(
      await prisma.instructor.create({
        data: {
          department_id: cs.id,
          first_name: inst.first,
          last_name: inst.last,
          email: `${inst.first.toLowerCase()}.${inst.last.toLowerCase()}@university.edu`,
        },
      })
    );
  }

  const mathInstructors = [];
  for (const inst of MATH_INSTRUCTORS) {
    mathInstructors.push(
      await prisma.instructor.create({
        data: {
          department_id: math.id,
          first_name: inst.first,
          last_name: inst.last,
          email: `${inst.first.toLowerCase()}.${inst.last.toLowerCase()}@university.edu`,
        },
      })
    );
  }

  // -------------------------
  // Courses (8 per department)
  // -------------------------
  const csCourses = [];
  for (const c of CS_COURSES) {
    csCourses.push(
      await prisma.course.create({
        data: {
          department_id: cs.id,
          course_number: c.number,
          title: c.title,
          description: c.description,
          credits: c.credits,
        },
      })
    );
  }

  const mathCourses = [];
  for (const c of MATH_COURSES) {
    mathCourses.push(
      await prisma.course.create({
        data: {
          department_id: math.id,
          course_number: c.number,
          title: c.title,
          description: c.description,
          credits: c.credits,
        },
      })
    );
  }

  // -------------------------
  // Sections — one Fall 2026 section per course,
  // instructors rotated round-robin within their department
  // -------------------------
  const csSections = [];
  for (let i = 0; i < csCourses.length; i++) {
    csSections.push(
      await prisma.section.create({
        data: {
          course_id: csCourses[i].id,
          instructor_id: csInstructors[i % csInstructors.length].id,
          term: "Fall 2026",
          section_number: "01",
          schedule: SECTION_TIMES[i % SECTION_TIMES.length],
        },
      })
    );
  }

  const mathSections = [];
  for (let i = 0; i < mathCourses.length; i++) {
    mathSections.push(
      await prisma.section.create({
        data: {
          course_id: mathCourses[i].id,
          instructor_id: mathInstructors[i % mathInstructors.length].id,
          term: "Fall 2026",
          section_number: "01",
          schedule: SECTION_TIMES[i % SECTION_TIMES.length],
        },
      })
    );
  }

  const allSections = [...csSections, ...mathSections];

  // -------------------------
  // Students (60 total, alternating major department)
  // -------------------------
  const students = [];
  const usedEmails = new Set<string>();

  for (let i = 0; i < 60; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 7) % LAST_NAMES.length]; // offset to reduce repeat pairing
    const majorDept = i % 2 === 0 ? cs.id : math.id;

    let emailBase = `${first.toLowerCase()}.${last.toLowerCase()}`;
    let email = `${emailBase}@student.edu`;
    let suffix = 1;
    while (usedEmails.has(email)) {
      email = `${emailBase}${suffix}@student.edu`;
      suffix++;
    }
    usedEmails.add(email);

    students.push(
      await prisma.student.create({
        data: {
          first_name: first,
          last_name: last,
          email,
          major_department_id: majorDept,
        },
      })
    );
  }

  // -------------------------
  // Enrollments — each student enrolls in 3 sections:
  // 2 from their major department + 1 elective from the other department
  // -------------------------
  const grades = ["A", "A-", "B+", "B", "B-", "C+", "C", null, null]; // some in-progress (null)

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const isCS = student.major_department_id === cs.id;
    const homeSections = isCS ? csSections : mathSections;
    const otherSections = isCS ? mathSections : csSections;

    const homePicks = shuffled(homeSections).slice(0, 2);
    const electivePick = shuffled(otherSections).slice(0, 1);
    const picks = [...homePicks, ...electivePick];

    for (const section of picks) {
      await prisma.enrollment.create({
        data: {
          student_id: student.id,
          section_id: section.id,
          grade: grades[Math.floor(Math.random() * grades.length)],
        },
      });
    }
  }

  console.log("Seed completed.");
  console.log(`Departments: 2`);
  console.log(`Courses: ${csCourses.length + mathCourses.length}`);
  console.log(`Instructors: ${csInstructors.length + mathInstructors.length}`);
  console.log(`Sections: ${allSections.length}`);
  console.log(`Students: ${students.length}`);
  console.log(`Enrollments: ${students.length * 3}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
