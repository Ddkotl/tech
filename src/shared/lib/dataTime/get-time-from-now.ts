import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import("dayjs/locale/ru");
dayjs.extend(relativeTime);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GetTimeFromNow(data: any) {
  return dayjs(data).locale("ru").fromNow();
}
