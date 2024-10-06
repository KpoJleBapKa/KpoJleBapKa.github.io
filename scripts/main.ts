// типи для днів тижня, часових проміжків та типів курсів
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = { // тип для професора
    id: number;
    name: string;
    department: string;
};

type Classroom = { // тип для аудиторії
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = { // тип для курсу
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = { // тип для заняття
    id: number;
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

type ScheduleConflict = { // тип для конфлікту в розкладі
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

// масиви для зберігання даних
let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];
let lessonIdCounter = 1;
const totalClassrooms = 20; // загальна кількість аудиторій

function addProfessor(professor: Professor): void { // додаємо професора до списку
    professors.push(professor);
}

function addCourse(course: Course): void { // додаємо курс до списку
    courses.push(course);
}

function addLesson(lesson: Omit<Lesson, 'id'>): boolean { // додаємо заняття до розкладу
    lesson.classroomNumber = `Room ${lesson.classroomNumber}`; 
    const conflict = validateLesson(lesson);
    if (conflict) {
        console.log("Conflict:", conflict);
        return false;
    }
    schedule.push({ ...lesson, id: lessonIdCounter++ });
    return true;
}

function validateLesson(lesson: Omit<Lesson, 'id'>, excludeLessonId?: number): ScheduleConflict | null { // перевіряємо заняття на конфлікти
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

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] { // шукаємо доступні аудиторії на певний час
    const usedClassrooms = schedule.filter(
        lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot
    ).map(lesson => lesson.classroomNumber);

    const allClassrooms = Array.from({ length: totalClassrooms }, (_, i) => `Room ${i + 1}`);
    return allClassrooms.filter(classroom => !usedClassrooms.includes(classroom));
}

function getClassroomUtilization(): number { // обчислюємо відсоток використання аудиторій
    const usedClassrooms = new Set(schedule.map(lesson => lesson.classroomNumber));
    return (usedClassrooms.size / totalClassrooms) * 100;
}

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean { // перепризначаємо аудиторію для заняття
    console.log(`Спроба перепризначити аудиторію для заняття ID: ${lessonId} на аудиторію: Room ${newClassroomNumber}`);
    
    const lessonIndex = schedule.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex === -1) {
        console.log('Заняття з таким ID не знайдено.');
        return false;
    }

    const lesson = schedule[lessonIndex];
    console.log('Поточне заняття:', lesson);

    const conflict = validateLesson({ ...lesson, classroomNumber: `Room ${newClassroomNumber}` }, lessonId);
    if (conflict) {
        console.log('Знайдено конфлікт:', conflict);
        return false;
    }

    schedule[lessonIndex].classroomNumber = `Room ${newClassroomNumber}`;
    console.log('Аудиторію успішно перепризначено.');
    return true;
}

function cancelLesson(lessonId: number): void { // видаляємо заняття з розкладу
    schedule = schedule.filter(lesson => lesson.id !== lessonId);
}

function getMostPopularCourseType(): CourseType | null { // знаходимо найпопулярніший тип курсу
    if (courses.length === 0) return null;

    const typeCount: Record<CourseType, number> = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0
    };

    for (const course of courses) {
        typeCount[course.type]++;
    }

    return Object.keys(typeCount).reduce((a, b) => typeCount[a as CourseType] > typeCount[b as CourseType] ? a : b) as CourseType;
}

// взаємодія з DOM для додавання професора
document.getElementById('professorForm')?.addEventListener('submit', function(event) { 
    event.preventDefault();
    const name = (document.getElementById('professorName') as HTMLInputElement).value;
    const department = (document.getElementById('professorDepartment') as HTMLInputElement).value;
    const newProfessor: Professor = { id: professors.length + 1, name, department };
    addProfessor(newProfessor);
    alert(`Professor ${name} added.`);
});

// взаємодія з DOM для додавання курсу
document.getElementById('courseForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = (document.getElementById('courseName') as HTMLInputElement).value;
    const type = (document.getElementById('courseType') as HTMLSelectElement).value as CourseType;
    const newCourse: Course = { id: courses.length + 1, name, type };
    addCourse(newCourse);
    alert(`Course ${name} added.`);
});

// взаємодія з DOM для додавання заняття
document.getElementById('lessonForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const courseId = parseInt((document.getElementById('lessonCourseId') as HTMLInputElement).value);
    const professorId = parseInt((document.getElementById('lessonProfessorId') as HTMLInputElement).value);
    const classroomNumber = (document.getElementById('lessonClassroomNumber') as HTMLInputElement).value;
    const dayOfWeek = (document.getElementById('lessonDayOfWeek') as HTMLSelectElement).value as DayOfWeek;
    const timeSlot = (document.getElementById('lessonTimeSlot') as HTMLSelectElement).value as TimeSlot;
    const newLesson: Omit<Lesson, 'id'> = { courseId, professorId, classroomNumber, dayOfWeek, timeSlot };
    if (addLesson(newLesson)) {
        alert('Lesson added.');
    } else {
        alert('Failed to add lesson due to conflict.');
    }
});

// взаємодія з DOM для перегляду розкладу професора
document.getElementById('professorScheduleForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const professorId = parseInt((document.getElementById('professorId') as HTMLInputElement).value);
    const professorLessons = schedule.filter(lesson => lesson.professorId === professorId);
    document.getElementById('scheduleResult')!.innerText = `Professor's Schedule: ${professorLessons.map(lesson => `Lesson ID: ${lesson.id}, Course ID: ${lesson.courseId}, Classroom: ${lesson.classroomNumber}, Day: ${lesson.dayOfWeek}, Time: ${lesson.timeSlot}`).join('; ')}`;
});

// взаємодія з DOM для обчислення використання аудиторій
document.getElementById('classroomUtilizationForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const utilization = getClassroomUtilization();
    document.getElementById('utilizationResult')!.innerText = `Classroom utilization: ${utilization.toFixed(2)}%`;
});

// взаємодія з DOM для пошуку доступних аудиторій
document.getElementById('availableClassroomsForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const dayOfWeek = (document.getElementById('availableDayOfWeek') as HTMLSelectElement).value as DayOfWeek;
    const timeSlot = (document.getElementById('availableTimeSlot') as HTMLSelectElement).value as TimeSlot;
    const availableClassrooms = findAvailableClassrooms(timeSlot, dayOfWeek);
    document.getElementById('availableClassroomsResult')!.innerText = `Available Classrooms: ${availableClassrooms.join(', ')}`;
});

// взаємодія з DOM для визначення найпопулярнішого типу курсу
document.getElementById('popularCourseTypeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const popularType = getMostPopularCourseType();
    document.getElementById('popularCourseTypeResult')!.innerText = `Most Popular Course Type: ${popularType}`;
});

// взаємодія з DOM для перепризначення аудиторії
document.getElementById('reassignClassroomForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const lessonId = parseInt((document.getElementById('reassignLessonId') as HTMLInputElement).value);
    const newClassroomNumber = (document.getElementById('newClassroomNumber') as HTMLInputElement).value;
    
    if (reassignClassroom(lessonId, newClassroomNumber)) {
        document.getElementById('reassignResult')!.innerText = 'Classroom reassigned successfully.';
    } else {
        document.getElementById('reassignResult')!.innerText = 'Failed to reassign classroom due to conflict.';
    }
});

// взаємодія з DOM для видалення заняття
document.getElementById('cancelLessonForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const lessonId = parseInt((document.getElementById('cancelLessonId') as HTMLInputElement).value);
    
    cancelLesson(lessonId);
    document.getElementById('cancelResult')!.innerText = 'Lesson cancelled successfully.';
});
