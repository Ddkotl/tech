export function cleanAndParseTags(inputString: string): string[] {
  try {
    // Убираем лишние символы (например, скобки, кавычки и спецсимволы)
    let cleanedString = inputString
      .replace(/[^a-zA-Zа-яА-Я0-9,\s'\[\]]/g, "") // Убираем лишние символы
      .trim(); // Убираем пробелы в начале и в конце строки

    // Преобразуем все тэги в нижний регистр для унификации
    cleanedString = cleanedString.toLowerCase();

    // Заменяем одинарные кавычки на двойные и добавляем кавычки для строковых элементов, если их нет
    cleanedString = cleanedString
      .replace(/,\s*/g, ",") // Убираем лишние пробелы после запятой
      .replace(/'/g, '"'); // Заменяем одинарные кавычки на двойные

    // Разделяем строку по запятым или пробелам и убираем лишние пробелы
    const tagArray = cleanedString
      .split(/[\s,]+/) // Разделяем по пробелам или запятым
      .map((tag) => tag.trim()) // Убираем лишние пробелы с каждого тега
      .filter((tag) => tag.length > 0); // Убираем пустые строки

    return tagArray; // Возвращаем массив тэгов
  } catch (error) {
    console.error("Ошибка обработки строки:", error);
    return [];
  }
}
