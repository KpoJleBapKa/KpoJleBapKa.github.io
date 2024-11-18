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
// додаємо заняття до розкладу
function addLesson(lesson) {
    lesson.classroomNumber = `Room ${lesson.classroomNumber}`; // форматуємо номер аудиторії
    const conflict = validateLesson(lesson); // перевіряємо на конфлікти
    if (conflict) {
        console.log("Conflict:", conflict); // виводимо конфлікт у консоль
        return false; // повертаємо false, якщо є конфлікт
    }
    schedule.push(Object.assign(Object.assign({}, lesson), { id: lessonIdCounter++ })); // додаємо заняття до розкладу
    return true; // повертаємо true, якщо заняття додано успішно
}
// перевіряємо заняття на конфлікти
function validateLesson(lesson, excludeLessonId) {
    for (const scheduledLesson of schedule) { // перебираємо всі заняття в розкладі
        if (scheduledLesson.id === excludeLessonId) {
            continue; // пропускаємо поточне заняття
        }
        if (scheduledLesson.professorId === lesson.professorId &&
            scheduledLesson.dayOfWeek === lesson.dayOfWeek &&
            scheduledLesson.timeSlot === lesson.timeSlot) {
            return { type: "ProfessorConflict", lessonDetails: scheduledLesson }; // конфлікт з професором
        }
        if (scheduledLesson.classroomNumber === lesson.classroomNumber &&
            scheduledLesson.dayOfWeek === lesson.dayOfWeek &&
            scheduledLesson.timeSlot === lesson.timeSlot) {
            return { type: "ClassroomConflict", lessonDetails: scheduledLesson }; // конфлікт з аудиторією
        }
    }
    return null; // повертаємо null, якщо конфліктів немає
}
// шукаємо доступні аудиторії на певний час
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const usedClassrooms = schedule.filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot).map(lesson => lesson.classroomNumber); // знаходимо зайняті аудиторії
    const allClassrooms = Array.from({ length: totalClassrooms }, (_, i) => `Room ${i + 1}`); // створюємо список всіх аудиторій
    return allClassrooms.filter(classroom => !usedClassrooms.includes(classroom)); // фільтруємо доступні аудиторії
}
// обчислюємо відсоток використання аудиторій
function getClassroomUtilization() {
    const usedClassrooms = new Set(schedule.map(lesson => lesson.classroomNumber)); // збираємо унікальні зайняті аудиторії
    return (usedClassrooms.size / totalClassrooms) * 100; // обчислюємо відсоток використання
}
// перепризначаємо аудиторію для заняття
function reassignClassroom(lessonId, newClassroomNumber) {
    console.log(`Спроба перепризначити аудиторію для заняття ID: ${lessonId} на аудиторію: Room ${newClassroomNumber}`);
    const lessonIndex = schedule.findIndex(lesson => lesson.id === lessonId); // знаходимо індекс заняття
    if (lessonIndex === -1) {
        console.log('Заняття з таким ID не знайдено.'); // виводимо помилку, якщо заняття не знайдено
        return false; // повертаємо false
    }
    const lesson = schedule[lessonIndex]; // отримуємо поточне заняття
    console.log('Поточне заняття:', lesson);
    const conflict = validateLesson(Object.assign(Object.assign({}, lesson), { classroomNumber: `Room ${newClassroomNumber}` }), lessonId); // перевіряємо на конфлікти
    if (conflict) {
        console.log('Знайдено конфлікт:', conflict); // виводимо конфлікт у консоль
        return false; // повертаємо false, якщо є конфлікт
    }
    schedule[lessonIndex].classroomNumber = `Room ${newClassroomNumber}`; // оновлюємо номер аудиторії
    console.log('Аудиторію успішно перепризначено.');
    return true; // повертаємо true
}
// видаляємо заняття з розкладу
function cancelLesson(lessonId) {
    schedule = schedule.filter(lesson => lesson.id !== lessonId); // фільтруємо розклад, видаляючи заняття
}
// знаходимо найпопулярніший тип курсу
function getMostPopularCourseType() {
    if (courses.length === 0)
        return null; // повертаємо null, якщо курсів немає
    const typeCount = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0
    };
    for (const course of courses) {
        typeCount[course.type]++; // рахуємо кількість курсів кожного типу
    }
    return Object.keys(typeCount).reduce((a, b) => typeCount[a] > typeCount[b] ? a : b); // знаходимо найпопулярніший тип
}
// взаємодія з DOM для додавання професора
(_a = document.getElementById('professorForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const name = document.getElementById('professorName').value; // отримуємо значення імені
    const department = document.getElementById('professorDepartment').value; // отримуємо значення кафедри
    const newProfessor = { id: professors.length + 1, name, department }; // створюємо об'єкт професора
    addProfessor(newProfessor); // додаємо професора до списку
    alert(`Professor ${name} added.`); // виводимо повідомлення про успішне додавання
});
// взаємодія з DOM для додавання курсу
(_b = document.getElementById('courseForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const name = document.getElementById('courseName').value; // отримуємо значення назви курсу
    const type = document.getElementById('courseType').value; // отримуємо значення типу курсу
    const newCourse = { id: courses.length + 1, name, type }; // отворюємо об'єкт курсу
    addCourse(newCourse); // додаємо курс до списку
    alert(`Course ${name} added.`); // виводимо повідомлення про успішне додавання
});
// взаємодія з DOM для додавання заняття
(_c = document.getElementById('lessonForm')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const courseId = parseInt(document.getElementById('lessonCourseId').value); // отримуємо ID курсу
    const professorId = parseInt(document.getElementById('lessonProfessorId').value); // отримуємо ID професора
    const classroomNumber = document.getElementById('lessonClassroomNumber').value; // отримуємо номер аудиторії
    const dayOfWeek = document.getElementById('lessonDayOfWeek').value; // отримуємо день тижня
    const timeSlot = document.getElementById('lessonTimeSlot').value; // отримуємо часовий проміжок
    const newLesson = { courseId, professorId, classroomNumber, dayOfWeek, timeSlot }; // створюємо об'єкт заняття
    if (addLesson(newLesson)) {
        alert('Lesson added.'); // виводимо повідомлення про успішне додавання
    }
    else {
        alert('Failed to add lesson due to conflict.'); // виводимо повідомлення про невдачу через конфлікт
    }
});
// взаємодія з DOM для перегляду розкладу професора
(_d = document.getElementById('professorScheduleForm')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const professorId = parseInt(document.getElementById('professorId').value); // отримуємо ID професора
    const professorLessons = schedule.filter(lesson => lesson.professorId === professorId); // фільтруємо заняття професора
    document.getElementById('scheduleResult').innerText = `Professor's Schedule: ${professorLessons.map(lesson => `Lesson ID: ${lesson.id}, Course ID: ${lesson.courseId}, Classroom: ${lesson.classroomNumber}, Day: ${lesson.dayOfWeek}, Time: ${lesson.timeSlot}`).join('; ')}`; // виводимо розклад
});
// взаємодія з DOM для обчислення використання аудиторій
(_e = document.getElementById('classroomUtilizationForm')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const utilization = getClassroomUtilization(); // обчислюємо використання
    document.getElementById('utilizationResult').innerText = `Classroom utilization: ${utilization.toFixed(2)}%`; // виводимо результат
});
// взаємодія з DOM для пошуку доступних аудиторій
(_f = document.getElementById('availableClassroomsForm')) === null || _f === void 0 ? void 0 : _f.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const dayOfWeek = document.getElementById('availableDayOfWeek').value; // отримуємо день тижня
    const timeSlot = document.getElementById('availableTimeSlot').value; // отримуємо часовий проміжок
    const availableClassrooms = findAvailableClassrooms(timeSlot, dayOfWeek); // знаходимо доступні аудиторії
    document.getElementById('availableClassroomsResult').innerText = `Available Classrooms: ${availableClassrooms.join(', ')}`; // виводимо результат
});
// взаємодія з DOM для визначення найпопулярнішого типу курсу
(_g = document.getElementById('popularCourseTypeForm')) === null || _g === void 0 ? void 0 : _g.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const popularType = getMostPopularCourseType(); // знаходимо найпопулярніший тип курсу
    document.getElementById('popularCourseTypeResult').innerText = `Most Popular Course Type: ${popularType}`; // виводимо результат
});
// взаємодія з DOM для перепризначення аудиторії
(_h = document.getElementById('reassignClassroomForm')) === null || _h === void 0 ? void 0 : _h.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const lessonId = parseInt(document.getElementById('reassignLessonId').value); // отримуємо ID заняття
    const newClassroomNumber = document.getElementById('newClassroomNumber').value; // отримуємо новий номер аудиторії
    if (reassignClassroom(lessonId, newClassroomNumber)) {
        document.getElementById('reassignResult').innerText = 'Classroom reassigned successfully.'; // виводимо повідомлення про успіх
    }
    else {
        document.getElementById('reassignResult').innerText = 'Failed to reassign classroom due to conflict.'; // виводимо повідомлення про невдачу
    }
});
// взаємодія з DOM для видалення заняття
(_j = document.getElementById('cancelLessonForm')) === null || _j === void 0 ? void 0 : _j.addEventListener('submit', function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const lessonId = parseInt(document.getElementById('cancelLessonId').value); // отримуємо ID заняття
    cancelLesson(lessonId); // видаляємо заняття
    document.getElementById('cancelResult').innerText = 'Lesson cancelled successfully.'; // виводимо повідомлення про успіх
});
