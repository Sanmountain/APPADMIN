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
            free_user: "N",
            qa: 0,
          });

          Swal.fire({
            icon: "success",
            title: "등록되었습니다",
            confirmButtonText: "확인",
          });
        }
        // NOTE 기존에 등록돼 있는 핸드폰번호 신규등록 시 수정으로 처리
        else if (data.result === "77") {
          paymentUserListMutate();

          setPaymentUser({
            user_id: "",
            phone_no: "",
            payment_date: dayjs().format("YYYY-MM-DD"),
            expire_date: dayjs().format("YYYY-MM-DD"),
            free_user: "N",
            qa: 0,
          });

          Swal.fire({
            icon: "success",
            title: "수정되었습니다",
            confirmButtonText: "확인",
          });
        } else if (data.result === "04") {
          Swal.fire({
            title: "Error!",
            text: "등록 오류",
            icon: "error",
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
