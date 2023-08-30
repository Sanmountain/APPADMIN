import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppScanListData,
  IAppScanListResponse,
} from "../../../types/appSet/appScanList.types";
import dayjs from "dayjs";

export const getScanUserList = (
  setScanUserCountList: Dispatch<SetStateAction<IAppScanListData[]>>,
  date: { year: string; month: string },
) => {
  const login = useRecoilValue(loginState);

  const lastDayOfMonth = dayjs(
    `${date.year}-${date.month.toString().padStart(2, "0")}-01`,
  )
    .endOf("month")
    .format("YYYY-MM-DD");

  return useMutation<IAppScanListResponse, unknown, void, unknown>(
    "getScanUserList",
    () =>
      instance.post("/scan_user/count", {
        company: login.company,
        front_date: `${date.year}-${date.month
          .toString()
          .padStart(2, "0")}-01 00:00:00`,
        rear_date: `${lastDayOfMonth} 23:59:59`,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setScanUserCountList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
