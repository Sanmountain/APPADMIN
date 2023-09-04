import { useEffect, useState } from "react";
import * as S from "../../../styles/mms/TalksendDetail.styles";
import { useRecoilValue } from "recoil";
import { talkSendListState } from "../../../stores/talkSendListState";
import { useParams } from "react-router";
import { IAlimtokListData } from "../../../types/mms/alimtokList.types";

export default function TalkSendDetail() {
  const talkSendList = useRecoilValue(talkSendListState);
  const [detail, setDetail] = useState<IAlimtokListData>();

  const params = useParams();
  const talkSendId = params.id;

  useEffect(() => {
    const matchingTalkSend = talkSendList.find(
      (item) => item.mid === talkSendId,
    );
    if (matchingTalkSend) setDetail(matchingTalkSend);
  }, []);

  return (
    <S.Container>
      <S.TopContainer>
        <S.SeparateContainer>
          <S.ContentsContainer>
            <S.Title>업무분류 : </S.Title>
            <S.Contents>
              {detail?.template_cd === "TM_6355"
                ? "배송출발"
                : detail?.template_cd === "TG_4570"
                ? "배송완료"
                : "배송완료 (193)"}
            </S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>송장번호 : </S.Title>
            <S.Contents>{detail?.iv_no}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>거래처코드 : </S.Title>
            <S.Contents>{detail?.cust_cd}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>서비스코드 : </S.Title>
            <S.Contents>{detail?.service_cd}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>스캔전송일시 : </S.Title>
            <S.Contents>{detail?.send_ymd}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>사원코드 : </S.Title>
            <S.Contents>{detail?.tradesub_cd}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>배송기사 전화 : </S.Title>
            <S.Contents>{detail?.tradesub_tel}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>송하인 : </S.Title>
            <S.Contents>{detail?.pk_nm}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>수령인 : </S.Title>
            <S.Contents>{detail?.dv_nm}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>수령인 전화번호1 : </S.Title>
            <S.Contents>{detail?.dv_tel1}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>수령인 전화번호2 : </S.Title>
            <S.Contents>{detail?.dv_tel2}</S.Contents>
          </S.ContentsContainer>
        </S.SeparateContainer>
        <S.SeparateContainer>
          <S.ContentsContainer>
            <S.Title>고유번호 : </S.Title>
            <S.Contents>{detail?.mid}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>메세지유형 : </S.Title>
            <S.Contents>{detail?.type}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>템플릿코드 : </S.Title>
            <S.Contents>{detail?.template_cd}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>발신번호 : </S.Title>
            <S.Contents>{detail?.sender}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>수신번호 : </S.Title>
            <S.Contents>{detail?.receiver}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>수신자명 : </S.Title>
            <S.Contents>{detail?.recvname}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>알림톡 성공여부 : </S.Title>
            <S.Contents>{detail?.rslt === "0" ? "성공" : "실패"}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>알림톡 결과메세지 : </S.Title>
            <S.Contents>{detail?.rslt_message}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>대체문자 전송상태 : </S.Title>
            <S.Contents>
              {detail?.sms_state === "" ? "보내지 않음" : detail?.sms_state}
            </S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>메세지 응답일시 : </S.Title>
            <S.Contents>{detail?.rsltdate}</S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>단가 : </S.Title>
            <S.Contents>{detail?.unit} 원</S.Contents>
          </S.ContentsContainer>
        </S.SeparateContainer>
      </S.TopContainer>
      <S.BottomContainer>
        <pre>{detail?.message}</pre>
      </S.BottomContainer>
    </S.Container>
  );
}
