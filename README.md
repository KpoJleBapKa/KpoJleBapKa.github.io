# University Schedule Management System

## Repository Overview

This repository is dedicated to developing a University Schedule Management System using TypeScript. The project focuses on utilizing concepts such as Union Types, Type Aliases, and Arrays to efficiently manage university schedules.

## Objectives

The main goal is to create a system for managing university class schedules, ensuring proper handling of scheduling conflicts and providing useful reports on resource utilization.

## Steps Completed

1. **Repository Setup**:

   - Initialized a new branch for the project.
   - Added a README file outlining the project objectives and tasks.

2. **Type Definitions**:

   - Defined a `DayOfWeek` type alias for days of the week.
   - Created a `TimeSlot` union type for possible class times.
   - Defined a `CourseType` type alias for types of courses.

3. **Data Structures**:

   - Created type aliases for core entities:
     - `Professor` with fields: `id`, `name`, `department`.
     - `Classroom` with fields: `number`, `capacity`, `hasProjector`.
     - `Course` with fields: `id`, `name`, `type`.
     - `Lesson` with fields: `courseId`, `professorId`, `classroomNumber`, `dayOfWeek`, `timeSlot`.

4. **Data Handling**:

   - Implemented arrays for storing data: `professors`, `classrooms`, `courses`, and `schedule`.
   - Developed a function `addProfessor(professor: Professor): void` to add new professors.
   - Created a function `addLesson(lesson: Lesson): boolean` to add lessons to the schedule, ensuring no conflicts.

5. **Search and Filtering Functions**:

   - Implemented `findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[]` to find available classrooms.
   - Developed `getProfessorSchedule(professorId: number): Lesson[]` to retrieve a professor's schedule.

6. **Conflict Handling and Validation**:

   - Defined a `ScheduleConflict` type alias for conflict details.
   - Created `validateLesson(lesson: Lesson): ScheduleConflict | null` to check for scheduling conflicts.

7. **Analysis and Reporting**:

   - Implemented `getClassroomUtilization(classroomNumber: string): number` to calculate classroom usage.
   - Developed `getMostPopularCourseType(): CourseType` to find the most popular course type.

8. **Data Modification**:
   - Created `reassignClassroom(lessonId: number, newClassroomNumber: string): boolean` to change classroom assignments.
   - Implemented `cancelLesson(lessonId: number): void` to remove lessons from the schedule.

## Expected Outcomes

1. All types are correctly defined using type aliases and union types.

- `type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";
`

2. Functions are implemented with proper type annotations for parameters and return values.

- `function addProfessor(professor: Professor): void, 
function addLesson(lesson: Lesson): boolean`

3. Efficient data handling with arrays, including adding, removing, and searching elements.

- `const professors: Professor[] = [];
const schedule: Lesson[] = [];`

4. Correct scheduling conflict handling and data validation.

- `function validateLesson(lesson: Lesson): ScheduleConflict | null`

5. Analysis functions provide useful insights into university resource usage.

- `function getClassroomUtilization(classroomNumber: string): number`

## Completion Criteria

- All tasks are implemented and function correctly.
- Code follows TypeScript best practices without using interfaces or generics.
- Consistent and correct use of type annotations throughout the project.
- Functions return expected results for various inputs.
- Basic error handling and edge case management are implemented.
- Code includes brief comments explaining complex logic.

## Repository Link

[GitHub Repository Link](https://github.com/KpoJleBapKa/kpojlebapka.github.io/tree/feature/schedule_management_system)
