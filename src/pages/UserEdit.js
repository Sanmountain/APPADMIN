import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { BiUser, BiPhone, BiRename, BiUserCircle } from "react-icons/bi";
import { BsBuilding, BsBoxSeam } from "react-icons/bs";
import { MdKeyOff, MdKey } from "react-icons/md";
import { adminModify, adminInfo } from "../API/API";
import { useEffect, useState } from "react";

export default function UserEdit() {
  const [, setUserInfo] = useState({
    user_id: "",
    user_name: "",
    user_phone: "",
    trade_cd: "",
    tradesub_cd: "",
    company: "",
  });
  const [userInfoEdit, setUserInfoEdit] = useState({
    user_id: "",
    user_name: "",
    user_phone: "",
    trade_cd: "",
    tradesub_cd: "",
    company: "",
  });
  const userId = localStorage.getItem("userId");
  const [userPwEdit, setUserPwEdit] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/notice/list");
  };

  useEffect(() => {
    adminInfoCheck();
  }, []);

  const adminInfoCheck = async () => {
    try {
      const response = await adminInfo({
        user_id: userId,
      });
      console.log(response.data);
      setUserInfo(response.data);

      const initialEditState = {
        user_id: response.data.user_id,
        user_name: response.data.user_name,
        user_phone: response.data.user_phone,
        trade_cd: response.data.trade_cd,
        tradesub_cd: response.data.tradesub_cd,
        company: response.data.company,
      };
      setUserInfoEdit(initialEditState);
    } catch (err) {
      console.error(err);
    }
  };

  /* 정보 수정 */
  const handleUserEdit = async () => {
    try {
      const response = await adminModify({
        user_id: userInfoEdit.user_id,
        user_pw: userPwEdit,
        user_name: userInfoEdit.user_name,
        user_phone: userInfoEdit.user_phone,
        trade_cd: userInfoEdit.trade_cd,
        tradesub_cd: userInfoEdit.tradesub_cd,
        company: userInfoEdit.company,
      });
      console.log(response.data);
      adminInfoCheck();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form>
          <h1>정보 수정</h1>
          <span>정보를 입력해주세요.</span>
          <div className="container-icon2">
            <select
              name="company"
              value={userInfoEdit.company}
              onChange={(e) =>
                setUserInfoEdit((prevUserInfoEdit) => ({
                  ...prevUserInfoEdit,
                  company: e.target.value,
                }))
              }
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
              value={userInfoEdit.user_id}
              readOnly
            />
            <div className="idIcon">
              <BiUser />
            </div>
          </div>
          <div className="container-icon2">
            <input
              type="text"
              placeholder="이름"
              value={userInfoEdit.user_name}
              onChange={(e) =>
                setUserInfoEdit((prevUserInfoEdit) => ({
                  ...prevUserInfoEdit,
                  user_name: e.target.value,
                }))
              }
            />
            <div className="idIcon">
              <BiRename />
            </div>
          </div>
          <div className="container-icon2">
            <input
              type="text"
              placeholder="전화번호"
              value={userInfoEdit.user_phone}
              onChange={(e) =>
                setUserInfoEdit((prevUserInfoEdit) => ({
                  ...prevUserInfoEdit,
                  user_phone: e.target.value,
                }))
              }
            />
            <div className="idIcon">
              <BiPhone />
            </div>
          </div>
          <div className="container-icon2">
            <input
              type="text"
              placeholder="점소코드"
              value={userInfoEdit.trade_cd}
              onChange={(e) =>
                setUserInfoEdit((prevUserInfoEdit) => ({
                  ...prevUserInfoEdit,
                  trade_cd: e.target.value,
                }))
              }
            />
            <div className="idIcon">
              <BsBoxSeam />
            </div>
          </div>
          <div className="container-icon2">
            <input
              type="text"
              placeholder="사원코드"
              value={userInfoEdit.tradesub_cd}
              onChange={(e) =>
                setUserInfoEdit((prevUserInfoEdit) => ({
                  ...prevUserInfoEdit,
                  tradesub_cd: e.target.value,
                }))
              }
            />
            <div className="idIcon">
              <BiUserCircle />
            </div>
          </div>
          <div className="container-icon2">
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={userPwEdit}
              onChange={(e) => setUserPwEdit(e.target.value)}
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
            {userPwEdit && confirmPw && userPwEdit !== confirmPw && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <button className="loginBtn" onClick={handleUserEdit}>
            정보수정
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>정보변경을 취소하려면 아래버튼을 눌러주세요.</p>
            <button className="ghost" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
