export const getReviewDeclension = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) return "обзор";
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return "обзора";
  return "обзоров";
};
