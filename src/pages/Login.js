import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { signIn, signUp } from "../API/API";
import Swal from "sweetalert2";
import { BiUser, BiKey, BiPhone, BiRename, BiUserCircle } from "react-icons/bi";
import { BsBuilding, BsBoxSeam } from "react-icons/bs";
import { MdKeyOff, MdKey } from "react-icons/md";

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

  const navigate = useNavigate();

  /* 회원가입, 로그인 버튼 클릭 시 패널 이동 */
  const togglePanel = () => {
    setRightPanelActive(!isRightPanelActive);
  };

  /* 로그인 실행 함수 */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({
        user_id: userId,
        user_pw: userPw,
      });
      if (response.data.result === "05") {
        Swal.fire({
          icon: "warning",
          title: "비밀번호를 확인해주세요",
          confirmButtonText: "확인",
        });
        navigate("/");
      } else if (response.data.result === "25") {
        Swal.fire({
          icon: "warning",
          title: "아이디를 확인해주세요",
          confirmButtonText: "확인",
        });
        navigate("/");
      } else {
        console.log(response.data);
        localStorage.setItem("userCompany", response.data.company);
        localStorage.setItem("userId", response.data.user_id);
        localStorage.setItem("userPw", response.data.user_pw);
        navigate("/notice/list");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "warning",
        title: "로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요",
        confirmButtonText: "확인",
      });
    }
  };

  /* 회원가입 실행 함수 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userPw === confirmPw) {
      try {
        const response = await signUp({
          user_id: userId,
          user_pw: userPw,
          user_name: userName,
          user_phone: userPhone,
          trade_cd: userCode,
          tradesub_cd: placeCode,
          company: company,
        });
        console.log(response.data);
        if (response.data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "회원가입 성공",
            confirmButtonText: "확인",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id='container'
    >
      <div className='form-container sign-up-container'>
        <form action='#'>
          <h1>회원 가입</h1>
          <span>정보를 입력해주세요.</span>
          <div className='container-icon2'>
            <select
              name='company'
              placeholder='택배사'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value='SLX'>SLX</option>
              <option value='LOGEN'>로젠택배</option>
              <option value='UPLOGIS'>유피로지스</option>
            </select>
            <div className='idIcon'>
              <BsBuilding />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='text'
              placeholder='아이디'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <div className='idIcon'>
              <BiUser />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='text'
              placeholder='이름'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <div className='idIcon'>
              <BiRename />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='text'
              placeholder='전화번호'
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
            <div className='idIcon'>
              <BiPhone />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='text'
              placeholder='점소코드'
              value={placeCode}
              onChange={(e) => setPlaceCode(e.target.value)}
            />
            <div className='idIcon'>
              <BsBoxSeam />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='text'
              placeholder='사원코드'
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
            <div className='idIcon'>
              <BiUserCircle />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='password'
              placeholder='비밀번호'
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
            />
            <div className='idIcon'>
              <MdKey />
            </div>
          </div>
          <div className='container-icon2'>
            <input
              type='password'
              placeholder='비밀번호 확인'
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <div className='idIcon'>
              <MdKeyOff />
            </div>
            {userPw && confirmPw && userPw !== confirmPw && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <button className='loginBtn' onClick={handleSubmit}>
            회원가입
          </button>
        </form>
      </div>
      <div className='form-container sign-in-container'>
        <form>
          <h1>LOGIN</h1>
          <span>로그인 정보를 입력해주세요.</span>
          <div className='container-icon'>
            <input
              type='text'
              placeholder='아이디'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <div className='idIcon'>
              <BiUser />
            </div>
          </div>
          <div className='container-icon'>
            <input
              type='password'
              placeholder='비밀번호'
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
            />
            <div className='idIcon'>
              <BiKey />
            </div>
          </div>
          <label className='checkbox-container'>
            <input type='checkbox' id='remember-check' />
            ID 저장
          </label>
          <button className='loginBtn' onClick={handleLogin}>
            로그인
          </button>
        </form>
      </div>
      <div className='overlay-container'>
        <div className='overlay'>
          <div className='overlay-panel overlay-left'>
            <h1>Welcome Back!</h1>
            <p>이미 계정이 있으신가요?</p>
            <button className='ghost' id='signIn' onClick={togglePanel}>
              로그인
            </button>
          </div>
          <div className='overlay-panel overlay-right'>
            <h1>Hello, Friend!</h1>
            <p>계정이 없으신가요?</p>
            <button className='ghost' id='signUp' onClick={togglePanel}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
