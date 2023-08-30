import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppScanDetailListData,
  IAppScanDetailListResponse,
} from "../../../types/appSet/appScanDetailList.types";
import { useParams } from "react-router";

export const getScanUserDetail = (
  setScanUserDetailList: Dispatch<SetStateAction<IAppScanDetailListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  const params = useParams();
  const date = params.scanDate;

  return useMutation<IAppScanDetailListResponse, unknown, void, unknown>(
    "getScanUserDetail",
    () =>
      instance.post("/scan_user/list", {
        company: login.company,
        front_date: `${date} 00:00:00`,
        rear_date: `${date} 23:59:59`,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setScanUserDetailList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
