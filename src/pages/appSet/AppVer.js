import { useEffect, useState } from "react";
import "../../styles/appVer.css";
import axios from "axios";
import { appDelete, appRegist, appModify } from "../../API/API";

export default function AppVer() {
  const [appinfo, setAppinfo] = useState([]);
  const [programInput, setProgramInput] = useState("");
  const [appverInput, setAppverInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [appinfoEdit, setAppinfoEdit] = useState({});
  const company = localStorage.getItem("userCompany");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    appinfoCheck();
  }, []);

  /* 조회 */
  const appinfoCheck = async () => {
    try {
      const response = await axios.post(
        "http://13.124.129.107:8080/AppAdmin/appinfo/list",
        {
          company: company,
        }
      );
      console.log(response.data);
      setAppinfo(response.data.list);

      const initialEditState = response.data.list.reduce(
        (obj, item) => ({
          ...obj,
          [item.program]: { app_ver: item.app_ver, apk_url: item.apk_url },
        }),
        {}
      );
      setAppinfoEdit(initialEditState);
    } catch (err) {
      console.error(err);
    }
  };

  /* 등록 */
  const handleAppRegist = async () => {
    try {
      const response = await appRegist({
        app_ver: appverInput,
        program: programInput,
        apk_url: urlInput,
        company: company,
        user_id: userId,
      });
      console.log(response.data);
      setProgramInput("");
      setAppverInput("");
      setUrlInput("");
      appinfoCheck();
    } catch (err) {
      console.error(err);
    }
  };

  /* 삭제 */
  const handleAppDel = async (program) => {
    try {
      const response = await appDelete({
        program: program,
      });
      console.log(response.data);
      appinfoCheck();
    } catch (err) {
      console.error(err);
    }
  };

  /* 수정 */
  const handleAppMod = async (program) => {
    try {
      const response = await appModify({
        program: program,
        app_ver: appinfoEdit[program].app_ver,
        apk_url: appinfoEdit[program].apk_url,
        company: company,
        user_id: userId,
      });
      console.log(response.data);
      appinfoCheck();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='appInfoFormDiv'>
      <div className='appInfoTitle'>현재 버전 정보</div>
      <div className='appInfoHeader'>
        <div className='headerItem'>프로그램</div>
        <div className='headerItem'>버전</div>
        <div className='headerItem'>APK다운로드</div>
        <div className='headerItem'>등록인</div>
      </div>
      {appinfo.map((item) => (
        <div className='appInfoObject' key={item.id}>
          <div className='appInfoInput'>
            <input
              type='text'
              className='form-control validate program'
              name='program'
              value={item.program}
              readOnly
            />
            <input
              type='text'
              className='form-control validate app_ver'
              name='app_ver'
              value={appinfoEdit[item.program].app_ver}
              onChange={(e) =>
                setAppinfoEdit({
                  ...appinfoEdit,
                  [item.program]: {
                    ...appinfoEdit[item.program],
                    app_ver: e.target.value,
                  },
                })
              }
            />
            <input
              type='text'
              className='form-control validate apk_url'
              name='apk_url'
              value={appinfoEdit[item.program].apk_url}
              onChange={(e) =>
                setAppinfoEdit({
                  ...appinfoEdit,
                  [item.program]: {
                    ...appinfoEdit[item.program],
                    apk_url: e.target.value,
                  },
                })
              }
            />
            <input
              type='text'
              className='form-control validate user_id'
              value={item.user_id}
              readOnly
            />
            <button
              className='commonAppBtn'
              onClick={() => handleAppMod(item.program)}
            >
              수정
            </button>
            <button
              className='commonAppBtn'
              onClick={() => handleAppDel(item.program)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
      <div className='appInfoObject'>
        <div className='appInfoInput'>
          <input
            type='text'
            className='form-control validate program'
            name='program'
            value={programInput}
            onChange={(e) => setProgramInput(e.target.value)}
          />
          <input
            type='text'
            className='form-control validate app_ver'
            name='app_ver'
            value={appverInput}
            onChange={(e) => setAppverInput(e.target.value)}
          />
          <input
            type='text'
            className='form-control validate apk_url'
            name='apk_url'
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <input className='hiddenUserid' />
          <button className='commonAppBtn' onClick={handleAppRegist}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
