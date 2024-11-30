"use strict";
// enum для статусу студента
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
// enum для типу курсу
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
// enum для семестру навчання
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
// enum для оцінок
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
// enum для факультетів університету
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// клас для управління університетом
class UniversityManagementSystem {
    students = [];
    courses = [];
    grades = [];
    studentIdCounter = 1;
    courseIdCounter = 1;
    // метод для зарахування студента
    enrollStudent(student) {
        const newStudent = { ...student, id: this.studentIdCounter++ };
        this.students.push(newStudent);
        return newStudent;
    }
    // метод для додавання курсу
    addCourse(course) {
        const newCourse = { ...course, id: this.courseIdCounter++, enrolledStudents: 0 };
        this.courses.push(newCourse);
        return newCourse;
    }
    // метод для реєстрації студента на курс
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student || !course) {
            throw new Error("Student or Course not found");
        }
        if (student.faculty !== course.faculty) {
            throw new Error("Student and course faculties do not match");
        }
        if (course.enrolledStudents >= course.maxStudents) {
            throw new Error("Course is full");
        }
        course.enrolledStudents++;
    }
    // метод для перевірки, чи студент зареєстрований на курс
    isStudentRegisteredForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        // перевірка, чи студент і курс існують
        if (!student || !course) {
            return false;
        }
        // повертаємо true, якщо студент зареєстрований на курс
        return student.faculty === course.faculty && course.enrolledStudents > 0;
    }
    // метод для встановлення оцінки
    setGrade(studentId, courseId, grade) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student || !course) {
            throw new Error("Student or Course not found");
        }
        if (!this.isStudentRegisteredForCourse(studentId, courseId)) {
            throw new Error("Student is not registered for this course");
        }
        const gradeEntry = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: Semester.First
        };
        this.grades.push(gradeEntry);
    }
    // метод для оновлення статусу студента
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error("Student not found");
        }
        if (newStatus === StudentStatus.Graduated && student.status !== StudentStatus.Active) {
            throw new Error("Only active students can be graduated");
        }
        student.status = newStatus;
    }
    // метод для отримання студентів за факультетом
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // метод для отримання оцінок студента
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // метод для отримання доступних курсів
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // метод для обчислення середньої оцінки студента
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0)
            return 0;
        const total = studentGrades.reduce((acc, g) => acc + g.grade, 0);
        return total / studentGrades.length;
    }
    // метод для отримання списку відмінників по факультету
    getHonorStudents(faculty) {
        return this.students.filter(student => {
            const averageGrade = this.calculateAverageGrade(student.id);
            return student.faculty === faculty && averageGrade >= 4.5;
        });
    }
}
// ТЕСТУВАННЯ
const university = new UniversityManagementSystem();
// додавання курсів
const course1 = university.addCourse({
    name: "Основи програмування C++",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});
const course2 = university.addCourse({
    name: "Вища математика",
    type: CourseType.Mandatory,
    credits: 4,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 25
});
// реєстрація студентів
const student1 = university.enrollStudent({
    fullName: "Валерій Жмишенко",
    faculty: Faculty.Computer_Science,
    year: 2024,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2021-09-01"),
    groupNumber: "ПТС-44"
});
const student2 = university.enrollStudent({
    fullName: "Іван Золочевський",
    faculty: Faculty.Economics,
    year: 2024,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2021-09-01"),
    groupNumber: "БОБ-45"
});
// реєстрація студентів на курси
university.registerForCourse(student1.id, course1.id);
university.registerForCourse(student2.id, course2.id);
// встановлення оцінок
university.setGrade(student1.id, course1.id, GradeValue.Excellent);
university.setGrade(student2.id, course2.id, GradeValue.Satisfactory);
// отримання середньої оцінки
const averageGradeStudent1 = university.calculateAverageGrade(student1.id);
console.log(`Середня оцінка студента ${student1.fullName}: ${averageGradeStudent1}`);
const averageGradeStudent2 = university.calculateAverageGrade(student2.id);
console.log(`Середня оцінка студента ${student2.fullName}: ${averageGradeStudent2}`);
// отримання списку відмінників по факультету
const honorStudentsCS = university.getHonorStudents(Faculty.Computer_Science);
console.log("Відмінники факультету комп'ютерних наук:", honorStudentsCS.map(s => s.fullName));
const honorStudentsECO = university.getHonorStudents(Faculty.Economics);
console.log("Відмінники факультету економіки:", honorStudentsECO.map(s => s.fullName));
// оновлення статусу студента
university.updateStudentStatus(student1.id, StudentStatus.Graduated);
console.log(`Статус студента ${student1.fullName} оновлено на: ${student1.status}`);
// список студентів за факультетом
const csStudents = university.getStudentsByFaculty(Faculty.Computer_Science);
console.log("Студенти факультету комп'ютерних наук:", csStudents.map(s => s.fullName));
