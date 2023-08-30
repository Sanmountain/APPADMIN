import { atom } from "recoil";
import { IMMSHistoryData } from "../types/mms/MMSHistory.types";

export const MMSSendListState = atom<IMMSHistoryData[]>({
  key: "MMSSendListState",
  default: [],
});
