import { useMutation } from "react-query";
import { instance } from "../instance";
import { ILoginResponse } from "../../types/Login.types";
import { useRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export const getLogin = (userId: string, userPw: string) => {
  const [login, setLogin] = useRecoilState(loginState);

  const navigate = useNavigate();

  return useMutation<ILoginResponse, unknown, void, unknown>(
    "getLogin",
    () => instance.post("/member/login", { user_id: userId, user_pw: userPw }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setLogin({
            ...login,
            isLogin: true,
            userId: data.user_id,
            userName: data.user_name,
            company: data.company,
          });
          navigate("/notice/list");
        } else if (data.result === "05") {
          Swal.fire({
            icon: "warning",
            title: "비밀번호를 확인해주세요",
            confirmButtonText: "확인",
          });
        } else if (data.result === "25") {
          Swal.fire({
            icon: "warning",
            title: "아이디를 확인해주세요",
            confirmButtonText: "확인",
          });
        }
      },
      onError: (error) => {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요",
          confirmButtonText: "확인",
        });
      },
    },
  );
};
