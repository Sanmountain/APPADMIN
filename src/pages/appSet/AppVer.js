import "../../styles/appSet/appVer.css";
import { useEffect, useState } from "react";
import { getAppInfoList } from "../../api/appSet/getAppInfoList";
import { getAppInfoRegist } from "../../api/appSet/getAppInfoRegist";
import { getAppInfoDelete } from "../../api/appSet/getAppInfoDelete";
import { getAppInfoModify } from "../../api/appSet/getAppInfoModify";

export default function AppVer() {
  // NOTE appInfoList
  const [appInfo, setAppInfo] = useState([]);
  const [appInfoEdit, setAppInfoEdit] = useState({});

  const [programInput, setProgramInput] = useState("");
  const [appVerInput, setAppVerInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const { mutate: appInfoListMutate } = getAppInfoList(
    setAppInfo,
    setAppInfoEdit,
  );
  const { mutate: appInfoRegist } = getAppInfoRegist(
    appVerInput,
    programInput,
    urlInput,
    setProgramInput,
    setAppVerInput,
    setUrlInput,
    appInfoListMutate,
  );

  useEffect(() => {
    appInfoListMutate();
  }, []);

  /* 등록 */
  const handleAppRegist = async () => {
    appInfoRegist();
  };

  /* 삭제 */
  const handleAppDel = async (program) => {
    const { mutate: appInfoDeleteMutate } = getAppInfoDelete(program);
    appInfoDeleteMutate();
  };

  /* 수정 */
  const handleAppMod = async (program) => {
    const { mutate: appInfoModifyMutate } = getAppInfoModify(program);
    appInfoModifyMutate();
  };

  return (
    <div className="appInfoFormDiv">
      <div className="appInfoTitle">현재 버전 정보</div>
      <div className="appInfoHeader">
        <div className="headerItem">프로그램</div>
        <div className="headerItem">버전</div>
        <div className="headerItem">APK다운로드</div>
        <div className="headerItem">등록인</div>
      </div>
      {appInfo.map((item) => (
        <div className="appInfoObject" key={item.id}>
          <div className="appInfoInput">
            <input
              type="text"
              className="form-control validate program"
              name="program"
              value={item.program}
              readOnly
            />
            <input
              type="text"
              className="form-control validate app_ver"
              name="app_ver"
              value={appInfoEdit[item.program].app_ver}
              onChange={(e) =>
                setAppInfoEdit({
                  ...appInfoEdit,
                  [item.program]: {
                    ...appInfoEdit[item.program],
                    app_ver: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              className="form-control validate apk_url"
              name="apk_url"
              value={appInfoEdit[item.program].apk_url}
              onChange={(e) =>
                setAppInfoEdit({
                  ...appInfoEdit,
                  [item.program]: {
                    ...appInfoEdit[item.program],
                    apk_url: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              className="form-control validate user_id"
              value={item.user_id}
              readOnly
            />
            <button
              className="commonAppBtn"
              onClick={() => handleAppMod(item.program)}
            >
              수정
            </button>
            <button
              className="commonAppBtn"
              onClick={() => handleAppDel(item.program)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
      <div className="appInfoObject">
        <div className="appInfoInput">
          <input
            type="text"
            className="form-control validate program"
            name="program"
            value={programInput}
            onChange={(e) => setProgramInput(e.target.value)}
          />
          <input
            type="text"
            className="form-control validate app_ver"
            name="app_ver"
            value={appVerInput}
            onChange={(e) => setAppVerInput(e.target.value)}
          />
          <input
            type="text"
            className="form-control validate apk_url"
            name="apk_url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <input className="hiddenUserid" />
          <button className="commonAppBtn" onClick={handleAppRegist}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
