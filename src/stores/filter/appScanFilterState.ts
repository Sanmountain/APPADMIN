import { atom } from "recoil";

// NOTE 현재부터 2018년까지 selectBox
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export const years = Array.from(
  { length: currentYear - 2017 },
  (_, i) => 2018 + i,
).reverse();
// NOTE 월 selectBox
export const months = Array.from({ length: 12 }, (_, i) => 1 + i);

export const appScanFilterState = atom({
  key: "appScanFilterState",
  default: {
    year: years[0].toString(),
    month: currentMonth.toString(),
  },
});
