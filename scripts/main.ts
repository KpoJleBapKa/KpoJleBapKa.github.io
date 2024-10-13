// типи для днів тижня, часових проміжків та типів курсів
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot =
  | "8:30-10:00"
  | "10:15-11:45"
  | "12:15-13:45"
  | "14:00-15:30"
  | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
  // тип для професора
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  // тип для аудиторії
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  // тип для курсу
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  // тип для заняття
  id: number;
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

type ScheduleConflict = {
  // тип для конфлікту в розкладі
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

function addProfessor(professor: Professor): void {
  // додаємо професора до списку
  professors.push(professor);
}

function addCourse(course: Course): void {
  // додаємо курс до списку
  courses.push(course);
}

// додаємо заняття до розкладу
function addLesson(lesson: Omit<Lesson, "id">): boolean {
  lesson.classroomNumber = `Room ${lesson.classroomNumber}`; // форматуємо номер аудиторії
  const conflict = validateLesson(lesson); // перевіряємо на конфлікти
  if (conflict) {
    console.log("Conflict:", conflict); // виводимо конфлікт у консоль
    return false; // повертаємо false, якщо є конфлікт
  }
  schedule.push({ ...lesson, id: lessonIdCounter++ }); // додаємо заняття до розкладу
  return true; // повертаємо true, якщо заняття додано успішно
}

// перевіряємо заняття на конфлікти
function validateLesson(
  lesson: Omit<Lesson, "id">,
  excludeLessonId?: number,
): ScheduleConflict | null {
  for (const scheduledLesson of schedule) {
    // перебираємо всі заняття в розкладі
    if (scheduledLesson.id === excludeLessonId) {
      continue; // пропускаємо поточне заняття
    }
    if (
      scheduledLesson.professorId === lesson.professorId &&
      scheduledLesson.dayOfWeek === lesson.dayOfWeek &&
      scheduledLesson.timeSlot === lesson.timeSlot
    ) {
      return { type: "ProfessorConflict", lessonDetails: scheduledLesson }; // конфлікт з професором
    }
    if (
      scheduledLesson.classroomNumber === lesson.classroomNumber &&
      scheduledLesson.dayOfWeek === lesson.dayOfWeek &&
      scheduledLesson.timeSlot === lesson.timeSlot
    ) {
      return { type: "ClassroomConflict", lessonDetails: scheduledLesson }; // конфлікт з аудиторією
    }
  }
  return null; // повертаємо null, якщо конфліктів немає
}

// шукаємо доступні аудиторії на певний час
function findAvailableClassrooms(
  timeSlot: TimeSlot,
  dayOfWeek: DayOfWeek,
): string[] {
  const usedClassrooms = schedule
    .filter(
      (lesson) =>
        lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot,
    )
    .map((lesson) => lesson.classroomNumber); // знаходимо зайняті аудиторії

  const allClassrooms = Array.from(
    { length: totalClassrooms },
    (_, i) => `Room ${i + 1}`,
  ); // створюємо список всіх аудиторій
  return allClassrooms.filter(
    (classroom) => !usedClassrooms.includes(classroom),
  ); // фільтруємо доступні аудиторії
}

// обчислюємо відсоток використання аудиторій
function getClassroomUtilization(): number {
  const usedClassrooms = new Set(
    schedule.map((lesson) => lesson.classroomNumber),
  ); // збираємо унікальні зайняті аудиторії
  return (usedClassrooms.size / totalClassrooms) * 100; // обчислюємо відсоток використання
}

// перепризначаємо аудиторію для заняття
function reassignClassroom(
  lessonId: number,
  newClassroomNumber: string,
): boolean {
  console.log(
    `Спроба перепризначити аудиторію для заняття ID: ${lessonId} на аудиторію: Room ${newClassroomNumber}`,
  );

  const lessonIndex = schedule.findIndex((lesson) => lesson.id === lessonId); // знаходимо індекс заняття
  if (lessonIndex === -1) {
    console.log("Заняття з таким ID не знайдено."); // виводимо помилку, якщо заняття не знайдено
    return false; // повертаємо false
  }

  const lesson = schedule[lessonIndex]; // отримуємо поточне заняття
  console.log("Поточне заняття:", lesson);

  const conflict = validateLesson(
    { ...lesson, classroomNumber: `Room ${newClassroomNumber}` },
    lessonId,
  ); // перевіряємо на конфлікти
  if (conflict) {
    console.log("Знайдено конфлікт:", conflict); // виводимо конфлікт у консоль
    return false; // повертаємо false, якщо є конфлікт
  }

  schedule[lessonIndex].classroomNumber = `Room ${newClassroomNumber}`; // оновлюємо номер аудиторії
  console.log("Аудиторію успішно перепризначено.");
  return true; // повертаємо true
}

// видаляємо заняття з розкладу
function cancelLesson(lessonId: number): void {
  schedule = schedule.filter((lesson) => lesson.id !== lessonId); // фільтруємо розклад, видаляючи заняття
}

// знаходимо найпопулярніший тип курсу
function getMostPopularCourseType(): CourseType | null {
  if (courses.length === 0) return null; // повертаємо null, якщо курсів немає

  const typeCount: Record<CourseType, number> = {
    Lecture: 0,
    Seminar: 0,
    Lab: 0,
    Practice: 0,
  };

  for (const course of courses) {
    typeCount[course.type]++; // рахуємо кількість курсів кожного типу
  }

  return Object.keys(typeCount).reduce((a, b) =>
    typeCount[a as CourseType] > typeCount[b as CourseType] ? a : b,
  ) as CourseType; // знаходимо найпопулярніший тип
}

// взаємодія з DOM для додавання професора
document
  .getElementById("professorForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const name = (document.getElementById("professorName") as HTMLInputElement)
      .value; // отримуємо значення імені
    const department = (
      document.getElementById("professorDepartment") as HTMLInputElement
    ).value; // отримуємо значення кафедри
    const newProfessor: Professor = {
      id: professors.length + 1,
      name,
      department,
    }; // створюємо об'єкт професора
    addProfessor(newProfessor); // додаємо професора до списку
    alert(`Professor ${name} added.`); // виводимо повідомлення про успішне додавання
  });

// взаємодія з DOM для додавання курсу
document
  .getElementById("courseForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const name = (document.getElementById("courseName") as HTMLInputElement)
      .value; // отримуємо значення назви курсу
    const type = (document.getElementById("courseType") as HTMLSelectElement)
      .value as CourseType; // отримуємо значення типу курсу
    const newCourse: Course = { id: courses.length + 1, name, type }; // отворюємо об'єкт курсу
    addCourse(newCourse); // додаємо курс до списку
    alert(`Course ${name} added.`); // виводимо повідомлення про успішне додавання
  });

// взаємодія з DOM для додавання заняття
document
  .getElementById("lessonForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const courseId = parseInt(
      (document.getElementById("lessonCourseId") as HTMLInputElement).value,
    ); // отримуємо ID курсу
    const professorId = parseInt(
      (document.getElementById("lessonProfessorId") as HTMLInputElement).value,
    ); // отримуємо ID професора
    const classroomNumber = (
      document.getElementById("lessonClassroomNumber") as HTMLInputElement
    ).value; // отримуємо номер аудиторії
    const dayOfWeek = (
      document.getElementById("lessonDayOfWeek") as HTMLSelectElement
    ).value as DayOfWeek; // отримуємо день тижня
    const timeSlot = (
      document.getElementById("lessonTimeSlot") as HTMLSelectElement
    ).value as TimeSlot; // отримуємо часовий проміжок
    const newLesson: Omit<Lesson, "id"> = {
      courseId,
      professorId,
      classroomNumber,
      dayOfWeek,
      timeSlot,
    }; // створюємо об'єкт заняття
    if (addLesson(newLesson)) {
      alert("Lesson added."); // виводимо повідомлення про успішне додавання
    } else {
      alert("Failed to add lesson due to conflict."); // виводимо повідомлення про невдачу через конфлікт
    }
  });

// взаємодія з DOM для перегляду розкладу професора
document
  .getElementById("professorScheduleForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const professorId = parseInt(
      (document.getElementById("professorId") as HTMLInputElement).value,
    ); // отримуємо ID професора
    const professorLessons = schedule.filter(
      (lesson) => lesson.professorId === professorId,
    ); // фільтруємо заняття професора
    document.getElementById("scheduleResult")!.innerText =
      `Professor's Schedule: ${professorLessons.map((lesson) => `Lesson ID: ${lesson.id}, Course ID: ${lesson.courseId}, Classroom: ${lesson.classroomNumber}, Day: ${lesson.dayOfWeek}, Time: ${lesson.timeSlot}`).join("; ")}`; // виводимо розклад
  });

// взаємодія з DOM для обчислення використання аудиторій
document
  .getElementById("classroomUtilizationForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const utilization = getClassroomUtilization(); // обчислюємо використання
    document.getElementById("utilizationResult")!.innerText =
      `Classroom utilization: ${utilization.toFixed(2)}%`; // виводимо результат
  });

// взаємодія з DOM для пошуку доступних аудиторій
document
  .getElementById("availableClassroomsForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const dayOfWeek = (
      document.getElementById("availableDayOfWeek") as HTMLSelectElement
    ).value as DayOfWeek; // отримуємо день тижня
    const timeSlot = (
      document.getElementById("availableTimeSlot") as HTMLSelectElement
    ).value as TimeSlot; // отримуємо часовий проміжок
    const availableClassrooms = findAvailableClassrooms(timeSlot, dayOfWeek); // знаходимо доступні аудиторії
    document.getElementById("availableClassroomsResult")!.innerText =
      `Available Classrooms: ${availableClassrooms.join(", ")}`; // виводимо результат
  });

// взаємодія з DOM для визначення найпопулярнішого типу курсу
document
  .getElementById("popularCourseTypeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const popularType = getMostPopularCourseType(); // знаходимо найпопулярніший тип курсу
    document.getElementById("popularCourseTypeResult")!.innerText =
      `Most Popular Course Type: ${popularType}`; // виводимо результат
  });

// взаємодія з DOM для перепризначення аудиторії
document
  .getElementById("reassignClassroomForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const lessonId = parseInt(
      (document.getElementById("reassignLessonId") as HTMLInputElement).value,
    ); // отримуємо ID заняття
    const newClassroomNumber = (
      document.getElementById("newClassroomNumber") as HTMLInputElement
    ).value; // отримуємо новий номер аудиторії

    if (reassignClassroom(lessonId, newClassroomNumber)) {
      document.getElementById("reassignResult")!.innerText =
        "Classroom reassigned successfully."; // виводимо повідомлення про успіх
    } else {
      document.getElementById("reassignResult")!.innerText =
        "Failed to reassign classroom due to conflict."; // виводимо повідомлення про невдачу
    }
  });

// взаємодія з DOM для видалення заняття
document
  .getElementById("cancelLessonForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault(); // запобігаємо стандартній поведінці форми
    const lessonId = parseInt(
      (document.getElementById("cancelLessonId") as HTMLInputElement).value,
    ); // отримуємо ID заняття

    cancelLesson(lessonId); // видаляємо заняття
    document.getElementById("cancelResult")!.innerText =
      "Lesson cancelled successfully."; // виводимо повідомлення про успіх
  });
