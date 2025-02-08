export function cleanAndParseArray(inputString: string): string[] {
  try {
    // Удаляем все лишние символы, кроме букв, цифр, пробелов, кавычек, запятых и скобок
    let cleanedString = inputString
      .replace(/[^a-zA-Zа-яА-Я0-9,\s'\[\]]/g, "") // Убираем лишние символы
      .replace(/,\s*$/, "") // Убираем запятую в конце строки
      .toLowerCase();

    // Добавляем кавычки для строковых элементов, если их нет
    cleanedString = cleanedString
      .replace(/(?<=\[|,)\s*([^'",\[\]\d]+)\s*(?=,|\])/g, '"$1"') // Добавляем кавычки вокруг строк
      .replace(/'/g, '"'); // Меняем одинарные кавычки на двойные

    // Проверяем, что строка имеет корректный формат скобок
    if (!cleanedString.startsWith("[")) cleanedString = "[" + cleanedString;
    if (!cleanedString.endsWith("]")) cleanedString = cleanedString + "]";
    // Парсим как JSON
    const parsedArray = JSON.parse(cleanedString);

    // Проверяем, что результат - массив
    if (Array.isArray(parsedArray)) {
      return parsedArray;
    } else {
      throw new Error("Результат не является массивом.");
    }
  } catch (error) {
    console.error("Ошибка обработки строки:", error);
    return [""];
  }
}
