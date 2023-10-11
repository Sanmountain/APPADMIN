import dayjs from "dayjs";

export const getMonthAndDaysDifference = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
) => {
  let months =
    (endDate.year() - startDate.year()) * 12 +
    (endDate.month() - startDate.month());
  let days = endDate.date() - startDate.date();

  if (days < 0) {
    months--;
    days += dayjs(startDate).daysInMonth();
  }

  return { months, days };
};
