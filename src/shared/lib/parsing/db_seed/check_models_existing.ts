import { dataBase } from "../../db_conect";

export const checkModelsExisting = async (
  models: {
    model: string;
    url: string;
  }[],
) => {
  const modelNotExists: {
    model: string;
    url: string;
  }[] = [];
  for (const model of models) {
    const isModelAlreadyExist = await dataBase.phoneModels.findUnique({
      where: { short_name: model.model },
    });
    if (!isModelAlreadyExist) {
      modelNotExists.push(model);
    }
  }
  return modelNotExists;
};
