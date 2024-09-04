// Додавання
function add(a: number, b: number): number {
    return a + b;
}

// Віднімання
function subtract(a: number, b: number): number {
    return a - b;
}

// Множення
function multiply(a: number, b: number): number {
    return a * b;
}

// Ділення
function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

// Парність
function isEven(num: number): boolean {
    return num % 2 === 0;
}

// Непарність
function isOdd(num: number): boolean {
    return num % 2 !== 0;
}

// Максимальне число
function findMax(arr: number[]): number {
    return Math.max(...arr);
}

// Мінімальне число
function findMin(arr: number[]): number {
    return Math.min(...arr);
}

// Середнє значення
function findAverage(arr: number[]): number {
    const sum = arr.reduce((acc, num) => acc + num, 0);
    return sum / arr.length;
}

// Перевірка на паліндром
function isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

// Унікальні значення
function unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

// Сортування за зростанням
function sortAscending(arr: number[]): number[] {
    return arr.sort((a, b) => a - b);
}

// Сортування за спаданням
function sortDescending(arr: number[]): number[] {
    return arr.sort((a, b) => b - a);
}

// Факторіал
function factorial(n: number): number {
    if (n < 0) {
        throw new Error("Factorial of negative number is not defined.");
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Число Фібоначчі
function fibonacci(n: number): number {
    if (n < 0) {
        throw new Error("Fibonacci of negative number is not defined.");
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Просте число
function isPrime(num: number): boolean {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Випадкове число
function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Цельсій в Фаренгейт
function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
}

// Фаренгейт в Цельсій
function fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
}

// Кілометри в милі
function kilometersToMiles(km: number): number {
    return km * 0.621371;
}

// Милі в кілометри
function milesToKilometers(miles: number): number {
    return miles / 0.621371;
}

// Порожній рядок
function isEmptyString(str: string): boolean {
    return str.trim().length === 0;
}

// Порожній масив
function isEmptyArray<T>(arr: T[]): boolean {
    return arr.length === 0;
}

// Порожній об'єкт
function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

// Об'єднання масивів
function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}

// Об'єднання об'єктів
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    return {...obj1, ...obj2};
}

// Перший індекс
function indexOf<T>(arr: T[], elem: T): number {
    return arr.indexOf(elem);
}

// Останній індекс
function lastIndexOf<T>(arr: T[], elem: T): number {
    return arr.lastIndexOf(elem);
}

// Містить елемент
function contains<T>(arr: T[], elem: T): boolean {
    return arr.includes(elem);
}

// Кількість входжень
function countOccurrences<T>(arr: T[], elem: T): number {
    return arr.filter(x => x === elem).length;
}

// Сума масиву
function sumArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc + num, 0);
}

// Добуток масиву
function productArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc * num, 1);
}

// Різниця масиву
function differenceArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc - num);
}

// Частка масиву
function quotientArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc / num);
}

// Залишок масиву
function remainderArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc % num);
}

// НСД
function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// НСК
function lcm(a: number, b: number): number {
    return Math.abs(a * b) / gcd(a, b);
}

// Валідна пошта
function isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валідний URL
function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Валідний телефон
function isValidPhoneNumber(phone: string): boolean {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
}

// Випадковий рядок
function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Випадковий пароль
function generateRandomPassword(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Валідний пароль
function isValidPassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

// Рядок в масив слів
function stringToWords(str: string): string[] {
    return str.trim().split(/\s+/);
}

// Масив слів в рядок
function wordsToString(words: string[]): string {
    return words.join(' ');
}

// Перевірка на масив
function isArray(obj: any): obj is any[] {
    return Array.isArray(obj);
}

// Перевірка на функцію
function isFunction(obj: any): obj is Function {
    return typeof obj === 'function';
}

// Перевірка на об'єкт
function isObject(obj: any): obj is object {
    return obj !== null && typeof obj === 'object';
}

// Перевірка на рядок
function isString(obj: any): obj is string {
    return typeof obj === 'string';
}

// Перевірка на число
function isNumber(obj: any): obj is number {
    return typeof obj === 'number';
}

// Перевірка на булеве значення
function isBoolean(obj: any): obj is boolean {
    return typeof obj === 'boolean';
}

// Перевірка на дату
function isDate(obj: any): obj is Date {
    return obj instanceof Date;
}

// Перевірка на регулярний вираз
function isRegExp(obj: any): obj is RegExp {
    return obj instanceof RegExp;
}

// Перевірка на null
function isNull(obj: any): obj is null {
    return obj === null;
}

// Перевірка на undefined
function isUndefined(obj: any): obj is undefined {
    return obj === undefined;
}

// Об'єкт в JSON
function objectToJSON(obj: object): string {
    return JSON.stringify(obj);
}

// JSON в об'єкт
function JSONToObject<T>(json: string): T {
    return JSON.parse(json);
}

// Клонування об'єкта
function cloneObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// Перевірка рівності об'єктів
function areObjectsEqual<T>(obj1: T, obj2: T): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Різниця масивів
function arrayDifference<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(x => !arr2.includes(x));
}

// Перетин масивів
function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(x => arr2.includes(x));
}

// Об'єднання масивів
function arrayUnion<T>(arr1: T[], arr2: T[]): T[] {
    return [...new Set([...arr1, ...arr2])];
}

// Симетрична різниця масивів
function arraySymmetricDifference<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1.filter(x => !arr2.includes(x)), ...arr2.filter(x => !arr1.includes(x))];
}
