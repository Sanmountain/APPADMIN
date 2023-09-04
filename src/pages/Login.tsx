import "../styles/login.css";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { BiUser, BiKey, BiPhone, BiRename, BiUserCircle } from "react-icons/bi";
import { BsBuilding, BsBoxSeam } from "react-icons/bs";
import { MdKeyOff, MdKey } from "react-icons/md";
import { getLogin } from "../api/login/getLogin";
import { getRegist } from "../api/login/getRegist";
import { useRecoilState } from "recoil";
import { loginState } from "../stores/loginState";
import { useNavigate } from "react-router";

export default function Login() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [placeCode, setPlaceCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [company, setCompany] = useState("SLX");
  const [checkedId, setCheckedId] = useState(false);

  const [login, setLogin] = useRecoilState(loginState);

  const { mutate: loginMutate } = getLogin(userId, userPw);
  const { mutate: signUpMutate } = getRegist(
    userId,
    userPw,
    userName,
    userPhone,
    userCode,
    placeCode,
    company,
  );

  const navigate = useNavigate();

  // NOTE 로그인 되어 있는 user의 경우 자동 로그인
  useEffect(() => {
    if (login.isLogin) {
      navigate("/notice/list");
    }
  }, [login]);

  useEffect(() => {
    if (login.isUserIdStored) {
      setUserId(login.userId);
      setCheckedId(true);
    }
  }, [login]);

  /* 회원가입, 로그인 버튼 클릭 시 패널 이동 */
  const togglePanel = () => {
    setRightPanelActive(!isRightPanelActive);
  };

  /* 로그인 실행 함수 */
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginMutate();
  };

  /* 회원가입 실행 함수 */
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userPw === confirmPw) {
      signUpMutate();
    }
  };

  const handleRememberIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedId(e.target.checked);
    setLogin({ ...login, userId, isUserIdStored: e.target.checked });
  };

  return (
    <div className="BackContainer">
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>회원 가입</h1>
            <span>정보를 입력해주세요.</span>
            <div className="container-icon2">
              <select
                name="company"
                placeholder="택배사"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="SLX">SLX</option>
                <option value="LOGEN">로젠택배</option>
                <option value="UPLOGIS">유피로지스</option>
              </select>
              <div className="idIcon">
                <BsBuilding />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="text"
                placeholder="아이디"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <div className="idIcon">
                <BiUser />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="text"
                placeholder="이름"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className="idIcon">
                <BiRename />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="text"
                placeholder="전화번호"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
              />
              <div className="idIcon">
                <BiPhone />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="text"
                placeholder="점소코드"
                value={placeCode}
                onChange={(e) => setPlaceCode(e.target.value)}
              />
              <div className="idIcon">
                <BsBoxSeam />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="text"
                placeholder="사원코드"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
              />
              <div className="idIcon">
                <BiUserCircle />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="password"
                placeholder="비밀번호"
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
              />
              <div className="idIcon">
                <MdKey />
              </div>
            </div>
            <div className="container-icon2">
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
              />
              <div className="idIcon">
                <MdKeyOff />
              </div>
              {userPw && confirmPw && userPw !== confirmPw && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            <button className="loginBtn" onClick={handleSubmit}>
              회원가입
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>LOGIN</h1>
            <span>로그인 정보를 입력해주세요.</span>
            <div className="container-icon">
              <input
                type="text"
                placeholder="아이디"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <div className="idIcon">
                <BiUser />
              </div>
            </div>
            <div className="container-icon">
              <input
                type="password"
                placeholder="비밀번호"
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
              />
              <div className="idIcon">
                <BiKey />
              </div>
            </div>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="remember-check"
                checked={checkedId}
                onChange={handleRememberIdChange}
              />
              ID 저장
            </label>
            <button className="loginBtn" onClick={handleLogin}>
              로그인
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>이미 계정이 있으신가요?</p>
              <button
                className="loginBtn ghost"
                id="signIn"
                onClick={togglePanel}
              >
                로그인
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>계정이 없으신가요?</p>
              <button
                className="loginBtn ghost"
                id="signUp"
                onClick={togglePanel}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
