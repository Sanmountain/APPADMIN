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
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setPaymentUser({
            user_id: "",
            phone_no: "",
            free_user: "",
            qa: null,
          });
          paymentUserListMutate();

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
