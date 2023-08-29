import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import { IAppMainWordResponse } from "../../../types/appSet/appMainWord.types";

export const getMainWord = (setMainWord: Dispatch<SetStateAction<string>>) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppMainWordResponse, unknown, void, unknown>(
    "getMainWord",
    () => instance.post("/mainWord/latest", { company: login.company }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setMainWord(data.word);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
