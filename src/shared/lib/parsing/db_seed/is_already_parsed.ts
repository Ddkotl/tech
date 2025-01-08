import { dataBaseParse } from "./db_connect";

export const IsNewsAlresdyParsed = async (title: string) => {
  const isTitliExist = await dataBaseParse.newsParsedTitles.findFirst({
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
  const isTitliExist = await dataBaseParse.reviewsParsedTitles.findFirst({
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
