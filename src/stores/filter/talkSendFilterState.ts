import { atom } from "recoil";
import dayjs from "dayjs";

export const talkSendFilterState = atom({
  key: "talkSendFilterState",
  default: {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    invoiceNumber: null,
    receiveTelephone: "",
    tradeSubCode: null,
    customerCode: null,
    serviceCode: "",
    messageType: "",
    templateCode: "",
    smsState: "",
  },
});
