import { atom } from "recoil";
import { IAlimtokListData } from "../types/mms/alimtokList.types";

export const talkSendListState = atom<IAlimtokListData[]>({
  key: "talkSendListState",
  default: [],
});
