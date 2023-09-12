import { useMutation, MutateOptions } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";
import {
  IAppPaymentUserRegistResponse,
  IAppPaymentUserResponse,
  IPaymentUser,
} from "../../../types/appSet/appPaymentUser.types";
import dayjs from "dayjs";

export const getPaymentUserRegist = (
  paymentUser: IPaymentUser,
  setPaymentUser: Dispatch<SetStateAction<IPaymentUser>>,
  paymentUserListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppPaymentUserResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppPaymentUserRegistResponse, unknown, void, unknown>(
    "getPaymentUserRegist",
    () =>
      instance.post("/payment_user/regist", {
        ...paymentUser,
        payment_date: `${dayjs(paymentUser.payment_date).format(
          "YYYY-MM-DD",
        )} 00:00:00`,
        expire_date: `${dayjs(paymentUser.expire_date).format(
          "YYYY-MM-DD",
        )} 23:59:59`,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          paymentUserListMutate();

          setPaymentUser({
            user_id: "",
            phone_no: "",
            payment_date: dayjs().format("YYYY-MM-DD"),
            expire_date: dayjs().format("YYYY-MM-DD"),
            free_user: "",
          });

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
