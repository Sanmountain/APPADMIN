import dayjs from "dayjs";

export const getMonthDifference = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
) => {
  const dayDifference = endDate.diff(startDate, "day");
  const monthDifference = Math.floor(dayDifference / 30);

  return Math.abs(monthDifference);
};
