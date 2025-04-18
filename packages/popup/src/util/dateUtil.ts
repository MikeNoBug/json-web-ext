import dayjs from 'dayjs';
export function format(arg: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const str = dayjs(arg).format(format);
  return str;
}

export function getTimeStamp(arg: string | Date | number): number {
  return dayjs(arg).toDate().getTime();
}
