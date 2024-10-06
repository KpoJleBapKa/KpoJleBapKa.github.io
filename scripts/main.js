"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
// масиви для зберігання даних
let professors = [];
let classrooms = [];
let courses = [];
let schedule = [];
let lessonIdCounter = 1;
const totalClassrooms = 20; // загальна кількість аудиторій
function addProfessor(professor) {
    professors.push(professor);
}
function addCourse(course) {
    courses.push(course);
}
function addLesson(lesson) {
    lesson.classroomNumber = `Room ${lesson.classroomNumber}`;
    const conflict = validateLesson(lesson);
    if (conflict) {
        console.log("Conflict:", conflict);
        return false;
    }
    schedule.push(Object.assign(Object.assign({}, lesson), { id: lessonIdCounter++ }));
    return true;
}
function validateLesson(lesson, excludeLessonId) {
    for (const scheduledLesson of schedule) {
        if (scheduledLesson.id === excludeLessonId) {
            continue; // пропускаємо поточне заняття
        }
        if (scheduledLesson.professorId === lesson.professorId && scheduledLesson.dayOfWeek === lesson.dayOfWeek && scheduledLesson.timeSlot === lesson.timeSlot) {
            return { type: "ProfessorConflict", lessonDetails: scheduledLesson };
        }
        if (scheduledLesson.classroomNumber === lesson.classroomNumber && scheduledLesson.dayOfWeek === lesson.dayOfWeek && scheduledLesson.timeSlot === lesson.timeSlot) {
            return { type: "ClassroomConflict", lessonDetails: scheduledLesson };
        }
    }
    return null;
}
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const usedClassrooms = schedule.filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot).map(lesson => lesson.classroomNumber);
    const allClassrooms = Array.from({ length: totalClassrooms }, (_, i) => `Room ${i + 1}`);
    return allClassrooms.filter(classroom => !usedClassrooms.includes(classroom));
}
function getClassroomUtilization() {
    const usedClassrooms = new Set(schedule.map(lesson => lesson.classroomNumber));
    return (usedClassrooms.size / totalClassrooms) * 100;
}
function reassignClassroom(lessonId, newClassroomNumber) {
    console.log(`Спроба перепризначити аудиторію для заняття ID: ${lessonId} на аудиторію: Room ${newClassroomNumber}`);
    const lessonIndex = schedule.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex === -1) {
        console.log('Заняття з таким ID не знайдено.');
        return false;
    }
    const lesson = schedule[lessonIndex];
    console.log('Поточне заняття:', lesson);
    const conflict = validateLesson(Object.assign(Object.assign({}, lesson), { classroomNumber: `Room ${newClassroomNumber}` }), lessonId);
    if (conflict) {
        console.log('Знайдено конфлікт:', conflict);
        return false;
    }
    schedule[lessonIndex].classroomNumber = `Room ${newClassroomNumber}`;
    console.log('Аудиторію успішно перепризначено.');
    return true;
}
function cancelLesson(lessonId) {
    schedule = schedule.filter(lesson => lesson.id !== lessonId);
}
function getMostPopularCourseType() {
    if (courses.length === 0)
        return null;
    const typeCount = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0
    };
    for (const course of courses) {
        typeCount[course.type]++;
    }
    return Object.keys(typeCount).reduce((a, b) => typeCount[a] > typeCount[b] ? a : b);
}
// взаємодія з DOM для додавання професора
(_a = document.getElementById('professorForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('professorName').value;
    const department = document.getElementById('professorDepartment').value;
    const newProfessor = { id: professors.length + 1, name, department };
    addProfessor(newProfessor);
    alert(`Professor ${name} added.`);
});
// взаємодія з DOM для додавання курсу
(_b = document.getElementById('courseForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('courseName').value;
    const type = document.getElementById('courseType').value;
    const newCourse = { id: courses.length + 1, name, type };
    addCourse(newCourse);
    alert(`Course ${name} added.`);
});
// взаємодія з DOM для додавання заняття
(_c = document.getElementById('lessonForm')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) {
    event.preventDefault();
    const courseId = parseInt(document.getElementById('lessonCourseId').value);
    const professorId = parseInt(document.getElementById('lessonProfessorId').value);
    const classroomNumber = document.getElementById('lessonClassroomNumber').value;
    const dayOfWeek = document.getElementById('lessonDayOfWeek').value;
    const timeSlot = document.getElementById('lessonTimeSlot').value;
    const newLesson = { courseId, professorId, classroomNumber, dayOfWeek, timeSlot };
    if (addLesson(newLesson)) {
        alert('Lesson added.');
    }
    else {
        alert('Failed to add lesson due to conflict.');
    }
});
// взаємодія з DOM для перегляду розкладу професора
(_d = document.getElementById('professorScheduleForm')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', function (event) {
    event.preventDefault();
    const professorId = parseInt(document.getElementById('professorId').value);
    const professorLessons = schedule.filter(lesson => lesson.professorId === professorId);
    document.getElementById('scheduleResult').innerText = `Professor's Schedule: ${professorLessons.map(lesson => `Lesson ID: ${lesson.id}, Course ID: ${lesson.courseId}, Classroom: ${lesson.classroomNumber}, Day: ${lesson.dayOfWeek}, Time: ${lesson.timeSlot}`).join('; ')}`;
});
// взаємодія з DOM для обчислення використання аудиторій
(_e = document.getElementById('classroomUtilizationForm')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', function (event) {
    event.preventDefault();
    const utilization = getClassroomUtilization();
    document.getElementById('utilizationResult').innerText = `Classroom utilization: ${utilization.toFixed(2)}%`;
});
// взаємодія з DOM для пошуку доступних аудиторій
(_f = document.getElementById('availableClassroomsForm')) === null || _f === void 0 ? void 0 : _f.addEventListener('submit', function (event) {
    event.preventDefault();
    const dayOfWeek = document.getElementById('availableDayOfWeek').value;
    const timeSlot = document.getElementById('availableTimeSlot').value;
    const availableClassrooms = findAvailableClassrooms(timeSlot, dayOfWeek);
    document.getElementById('availableClassroomsResult').innerText = `Available Classrooms: ${availableClassrooms.join(', ')}`;
});
// взаємодія з DOM для визначення найпопулярнішого типу курсу
(_g = document.getElementById('popularCourseTypeForm')) === null || _g === void 0 ? void 0 : _g.addEventListener('submit', function (event) {
    event.preventDefault();
    const popularType = getMostPopularCourseType();
    document.getElementById('popularCourseTypeResult').innerText = `Most Popular Course Type: ${popularType}`;
});
// взаємодія з DOM для перепризначення аудиторії
(_h = document.getElementById('reassignClassroomForm')) === null || _h === void 0 ? void 0 : _h.addEventListener('submit', function (event) {
    event.preventDefault();
    const lessonId = parseInt(document.getElementById('reassignLessonId').value);
    const newClassroomNumber = document.getElementById('newClassroomNumber').value;
    if (reassignClassroom(lessonId, newClassroomNumber)) {
        document.getElementById('reassignResult').innerText = 'Classroom reassigned successfully.';
    }
    else {
        document.getElementById('reassignResult').innerText = 'Failed to reassign classroom due to conflict.';
    }
});
// взаємодія з DOM для видалення заняття
(_j = document.getElementById('cancelLessonForm')) === null || _j === void 0 ? void 0 : _j.addEventListener('submit', function (event) {
    event.preventDefault();
    const lessonId = parseInt(document.getElementById('cancelLessonId').value);
    cancelLesson(lessonId);
    document.getElementById('cancelResult').innerText = 'Lesson cancelled successfully.';
});
