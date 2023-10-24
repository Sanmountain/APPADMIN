import dayjs from "dayjs";

export const getMonthDifference = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
) => {
  const difference = endDate.diff(startDate, "month");

  return Math.abs(difference);
};
