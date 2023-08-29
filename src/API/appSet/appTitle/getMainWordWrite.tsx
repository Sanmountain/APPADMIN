import { UseMutateFunction, useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import {
  IAppMainWordResponse,
  IAppMainWordWriteResponse,
} from "../../../types/appSet/appMainWord.types";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";

export const getMainWordWrite = (
  changeWord: string,
  setChangeWord: Dispatch<SetStateAction<string>>,
  mainWordMutate: UseMutateFunction<
    IAppMainWordResponse,
    unknown,
    void,
    unknown
  >,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppMainWordWriteResponse, unknown, void, unknown>(
    "getMainWordWrite",
    () =>
      instance.post("/mainWord/write", {
        company: login.company,
        word: changeWord,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "메인문구가 변경되었습니다",
            confirmButtonText: "확인",
          });
          setChangeWord("");
          mainWordMutate();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
