import { dataBase } from "../../db_conect";

export const IsNewsAlresdyParsed = async (title: string) => {
  const isTitliExist = await dataBase.newsParsedTitles.findFirst({
    where: {
      title: title,
    },
  });
  if (isTitliExist) {
    return true;
  } else {
    return false;
  }
};

export const IsReviewAlreadyParsed = async (
  title: string,
): Promise<boolean> => {
  const isTitliExist = await dataBase.reviewsParsedTitles.findFirst({
    where: {
      title: title,
    },
  });
  if (isTitliExist) {
    return true;
  } else {
    return false;
  }
};
