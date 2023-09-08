import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppScanUserExcelResponse,
  IExcelFilter,
  IUserCount,
} from "../../../types/appSet/appScanList.types";
import dayjs from "dayjs";

export const getScanUserExcelList = (
  setSLXUserCode: Dispatch<SetStateAction<string[]>>,
  setSLXUserCount: Dispatch<SetStateAction<IUserCount[]>>,
  setKBUserCode: Dispatch<SetStateAction<string[]>>,
  setKBUserCount: Dispatch<SetStateAction<IUserCount[]>>,
  setUPLogisUserCode: Dispatch<SetStateAction<string[]>>,
  setUPLogisUserCount: Dispatch<SetStateAction<IUserCount[]>>,
  excelFilter: IExcelFilter,
) => {
  const login = useRecoilValue(loginState);

  const lastDayOfMonth = dayjs(
    `${excelFilter.year}-${excelFilter.month.toString().padStart(2, "0")}-01`,
  )
    .endOf("month")
    .format("YYYY-MM-DD");

  return useMutation<IAppScanUserExcelResponse, unknown, void, unknown>(
    "getScanUserExcelList",
    () =>
      instance.post("/scan_user/excel", {
        company: login.company,
        front_date: `${excelFilter.year}-${excelFilter.month
          .toString()
          .padStart(2, "0")}-01 00:00:00`,
        rear_date: `${lastDayOfMonth} 23:59:59`,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setSLXUserCode(data.slx);
          setSLXUserCount(data.slxCount);
          setKBUserCode(data.kb);
          setKBUserCount(data.kbCount);
          setUPLogisUserCode(data.uplogis);
          setUPLogisUserCount(data.uplogisCount);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
