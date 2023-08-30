import { atom } from "recoil";
import { IScanUserListState } from "../types/appSet/appScanList.types";

export const scanUserListState = atom<IScanUserListState>({
  key: "scanUserListState",
  default: {},
});
