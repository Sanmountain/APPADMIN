import { useMutation } from "react-query";
import { instance } from "../instance";
import { IRegistResponse } from "../../types/Login.types";
import Swal from "sweetalert2";

export const getRegist = (
  userId: string,
  userPw: string,
  userName: string,
  userPhone: string,
  userCode: string,
  placeCode: string,
  company: string,
) => {
  return useMutation<IRegistResponse, unknown, void, unknown>(
    "getRegist",
    () =>
      instance.post("/member/regist", {
        user_id: userId,
        user_pw: userPw,
        user_name: userName,
        user_phone: userPhone,
        trade_cd: userCode,
        tradesub_cd: placeCode,
        company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "회원가입 성공",
            confirmButtonText: "확인",
          });
        } else if (data.result === "10") {
          Swal.fire({
            icon: "warning",
            title: "가입 양식을 모두 채워주세요",
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
