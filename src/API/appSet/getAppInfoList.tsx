import { useMutation } from "react-query";
import { instance } from "../instance";
import { IAppInfoListResponse } from "../../types/appSet/appInfoList.types";
import { loginState } from "../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";

export const getAppInfoList = (
  setAppInfo: Dispatch<SetStateAction<any[]>>,
  setAppInfoEdit: Dispatch<SetStateAction<{}>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppInfoListResponse, unknown, void, unknown>(
    "getAppInfoList",
    () => instance.post("/appinfo/list", { company: login.company }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setAppInfo(data.list);

          const initialEditState = data.list.reduce(
            (obj, item) => ({
              ...obj,
              [item.program]: { app_ver: item.app_ver, apk_url: item.apk_url },
            }),
            {},
          );
          setAppInfoEdit(initialEditState);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
