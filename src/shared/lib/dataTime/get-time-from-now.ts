import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import("dayjs/locale/ru");
dayjs.extend(relativeTime);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GetTimeFromNow(arr: any[]) {
  return arr.map((e) => {
    return {
      ...e,
      createdAt: dayjs(e.createdAt).locale("ru").fromNow(),
      updatedAt: dayjs(e.updatedAt).locale("ru").fromNow(),
    };
  });
}
