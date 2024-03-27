const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

    await prisma.distribution.deleteMany({});
    await prisma.class.deleteMany({});
    await prisma.instructor.deleteMany({});
    await prisma.department.deleteMany({});

    // Create departments
    const departments = await Promise.all([
        prisma.department.create({ data: { code: 'CS', name: 'Computer Science' } }),
        prisma.department.create({ data: { code: 'MATH', name: 'Mathematics' } }),
        prisma.department.create({ data: { code: 'PHYS', name: 'Physics' } }),
        prisma.department.create({ data: { code: 'CHEM', name: 'Chemistry' } }),
        prisma.department.create({ data: { code: 'BIOL', name: 'Biology' } }),
    ]);

    // Create instructors
    const instructors = await Promise.all([
        prisma.instructor.create({ data: { name: 'John Doe', department: 'Computer Science' } }),
        prisma.instructor.create({ data: { name: 'Jane Smith', department: 'Mathematics' } }),
        prisma.instructor.create({ data: { name: 'Michael Johnson', department: 'Physics' } }),
        prisma.instructor.create({ data: { name: 'Emily Davis', department: 'Chemistry' } }),
        prisma.instructor.create({ data: { name: 'David Wilson', department: 'Biology' } }),
    ]);

    // Create classes
    const classes = await Promise.all([
        prisma.class.create({ data: { code: 'CS101', name: 'Introduction to Programming', departmentId: departments[0].id } }),
        prisma.class.create({ data: { code: 'CS201', name: 'Data Structures and Algorithms', departmentId: departments[0].id } }),
        prisma.class.create({ data: { code: 'CS301', name: 'Database Systems', departmentId: departments[0].id } }),
        prisma.class.create({ data: { code: 'MATH101', name: 'Calculus I', departmentId: departments[1].id } }),
        prisma.class.create({ data: { code: 'MATH201', name: 'Linear Algebra', departmentId: departments[1].id } }),
        prisma.class.create({ data: { code: 'MATH301', name: 'Probability and Statistics', departmentId: departments[1].id } }),
        prisma.class.create({ data: { code: 'PHYS101', name: 'Introduction to Physics', departmentId: departments[2].id } }),
        prisma.class.create({ data: { code: 'PHYS201', name: 'Classical Mechanics', departmentId: departments[2].id } }),
        prisma.class.create({ data: { code: 'PHYS301', name: 'Quantum Mechanics', departmentId: departments[2].id } }),
        prisma.class.create({ data: { code: 'CHEM101', name: 'General Chemistry', departmentId: departments[3].id } }),
        prisma.class.create({ data: { code: 'CHEM201', name: 'Organic Chemistry', departmentId: departments[3].id } }),
        prisma.class.create({ data: { code: 'CHEM301', name: 'Physical Chemistry', departmentId: departments[3].id } }),
        prisma.class.create({ data: { code: 'BIOL101', name: 'Introduction to Biology', departmentId: departments[4].id } }),
        prisma.class.create({ data: { code: 'BIOL201', name: 'Genetics', departmentId: departments[4].id } }),
        prisma.class.create({ data: { code: 'BIOL301', name: 'Molecular Biology', departmentId: departments[4].id } }),
    ]);

    // Create distributions
    await Promise.all([
        prisma.distribution.create({
            data: {
                classId: classes[0].id,
                instructorId: instructors[0].id,
                term: 'Fall 2023',
                grades: { A: 50, B: 30, C: 15, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[1].id,
                instructorId: instructors[0].id,
                term: 'Spring 2023',
                grades: { A: 45, B: 35, C: 15, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[2].id,
                instructorId: instructors[0].id,
                term: 'Fall 2022',
                grades: { A: 40, B: 30, C: 20, D: 10, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[3].id,
                instructorId: instructors[1].id,
                term: 'Spring 2023',
                grades: { A: 35, B: 40, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[4].id,
                instructorId: instructors[1].id,
                term: 'Fall 2022',
                grades: { A: 30, B: 45, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[5].id,
                instructorId: instructors[1].id,
                term: 'Spring 2022',
                grades: { A: 25, B: 50, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[6].id,
                instructorId: instructors[2].id,
                term: 'Fall 2023',
                grades: { A: 40, B: 35, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[7].id,
                instructorId: instructors[2].id,
                term: 'Spring 2023',
                grades: { A: 35, B: 40, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[8].id,
                instructorId: instructors[2].id,
                term: 'Fall 2022',
                grades: { A: 30, B: 45, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[9].id,
                instructorId: instructors[3].id,
                term: 'Spring 2023',
                grades: { A: 45, B: 35, C: 15, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[10].id,
                instructorId: instructors[3].id,
                term: 'Fall 2022',
                grades: { A: 40, B: 30, C: 20, D: 10, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[11].id,
                instructorId: instructors[3].id,
                term: 'Spring 2022',
                grades: { A: 35, B: 40, C: 20, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[12].id,
                instructorId: instructors[4].id,
                term: 'Fall 2023',
                grades: { A: 50, B: 30, C: 15, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[13].id,
                instructorId: instructors[4].id,
                term: 'Spring 2023',
                grades: { A: 45, B: 35, C: 15, D: 5, F: 0 },
            },
        }),
        prisma.distribution.create({
            data: {
                classId: classes[14].id,
                instructorId: instructors[4].id,
                term: 'Fall 2022',
                grades: { A: 40, B: 30, C: 20, D: 10, F: 0 },
            },
        }),
    ]);

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });