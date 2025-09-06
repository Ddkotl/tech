import { dataBase } from "../db_conect";

async function deleteWrongPhoneModels() {
  try {
    // Находим все спецификации с неправильным description
    const wrongSpecs = await dataBase.specification.findMany({
      where: {
        description: {
          not: {
            startsWith: "<h2>",
          },
        },
      },
      select: { phoneModelId: true },
    });

    const modelIds = [...new Set(wrongSpecs.map((s) => s.phoneModelId))];
    console.log("Найдено моделей для удаления:", modelIds.length);

    if (modelIds.length === 0) return;

    // Удаляем модели (каскадно удалятся и спецификации, и связанные ревью)
    await dataBase.phoneModels.deleteMany({
      where: {
        id: {
          in: modelIds,
        },
      },
    });

    console.log("Удалено моделей:", modelIds.length);
  } catch (error) {
    console.error("deleteWrongPhoneModels error", error);
  }
}
(async () => {
  deleteWrongPhoneModels();
})();
