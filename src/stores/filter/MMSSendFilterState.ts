import { atom } from "recoil";
import dayjs from "dayjs";

export const MMSSendFilterState = atom({
  key: "MMSSendFilterState",
  default: {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    state: "",
    invoiceNumber: null,
    telephone: "",
    tradeSubCode: null,
  },
});
