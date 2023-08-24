import { UseMutateFunction, useMutation } from "react-query";
import { instance } from "../instance";
import {
  IAppInfoDeleteResponse,
  IAppInfoListResponse,
} from "../../types/appSet/appInfoList.types";
import Swal from "sweetalert2";
import { loginState } from "../../stores/loginState";
import { useRecoilValue } from "recoil";

export const getAppInfoModify = (
  program: string,
  appInfoEdit: any,
  appInfoListMutate: UseMutateFunction<
    IAppInfoListResponse,
    unknown,
    void,
    unknown
  >,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppInfoDeleteResponse, unknown, void, unknown>(
    "getAppInfoModify",
    () =>
      instance.post("/appinfo/modify", {
        program,
        app_ver: appInfoEdit[program].app_ver,
        apk_url: appInfoEdit[program].apk_url,
        company: login.company,
        user_id: login.userId,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          appInfoListMutate();

          Swal.fire({
            icon: "success",
            title: "수정되었습니다",
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
