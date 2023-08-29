import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import { IAppScanListResponse } from "../../../types/appSet/appScanList.types";

export const getScanUserList = (
  setScanUserList: Dispatch<SetStateAction<any>>,
  date: string,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppScanListResponse, unknown, void, unknown>(
    "getScanUserList",
    () =>
      instance.post("/scan_user/list", {
        company: login.company,
        front_date: `${date} 00:00:00`,
        rear_date: `${date} 23:59:59`,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setScanUserList(data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
