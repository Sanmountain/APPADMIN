import { UseMutateFunction, useMutation } from "react-query";
import { instance } from "../instance";
import {
  IAppInfoListResponse,
  IAppInfoRegistResponse,
} from "../../types/appSet/appInfoList.types";
import { loginState } from "../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

export const getAppInfoRegist = (
  appVerInput: string,
  programInput: string,
  urlInput: string,
  setProgramInput: Dispatch<SetStateAction<string>>,
  setAppVerInput: Dispatch<SetStateAction<string>>,
  setUrlInput: Dispatch<SetStateAction<string>>,
  appInfoListMutate: UseMutateFunction<
    IAppInfoListResponse,
    unknown,
    void,
    unknown
  >,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppInfoRegistResponse, unknown, void, unknown>(
    "getAppInfoRegist",
    () =>
      instance.post("/appinfo/regist", {
        app_ver: appVerInput,
        program: programInput,
        apk_url: urlInput,
        company: login.company,
        user_id: login.userId,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setProgramInput("");
          setAppVerInput("");
          setUrlInput("");
          appInfoListMutate();

          Swal.fire({
            icon: "success",
            title: "등록되었습니다",
            confirmButtonText: "확인",
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
