import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppVideoListData,
  IAppVideoListResponse,
} from "../../../types/appSet/appVideoList.types";

export const getAppVideoList = (
  page: number,
  setVideoList: Dispatch<SetStateAction<IAppVideoListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppVideoListResponse, unknown, void, unknown>(
    "getAppVideoList",
    () =>
      instance.post("/video/list", {
        company: login.company,
        page,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setVideoList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
