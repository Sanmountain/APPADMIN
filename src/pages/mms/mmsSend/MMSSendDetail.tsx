import { useRecoilValue } from "recoil";
import * as S from "../../../styles/mms/MMSSendDetail.styles";
import { MMSSendListState } from "../../../stores/MMSSendListState";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMMSSendList } from "../../../api/mms/getMMSSendList";
import NotFound from "../../../assets/image/img_notFound.jpg";

export default function MMSSendDetail() {
  const [matchingObject, setMatchingObject] = useState<any>({});
  const MMSSendList = useRecoilValue(MMSSendListState);

  const params = useParams();
  const navigate = useNavigate();

  const { mutate: MMSSendListMutate } = getMMSSendList(Number(params.page));

  useEffect(() => {
    // NOTE list에서 id 같은 객체 가져오기
    setMatchingObject(MMSSendList.find((obj) => obj.id === params.id));

    // NOTE 새로고침해서 MMSSendList 날아갈 경우 다시 요청하기
    if (MMSSendList.length < 1) {
      MMSSendListMutate();
      setMatchingObject(MMSSendList.find((obj) => obj.id === params.id));
    }
  }, [MMSSendList, matchingObject]);

  const onClickMoveToList = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.BackIcon onClick={onClickMoveToList} />
      </S.TopContainer>
      <S.ImageTableContainer>
        <S.Image
          src={matchingObject?.img_uri ? matchingObject?.img_uri : NotFound}
        />
        <S.TableContainer>
          <S.Table>
            <S.TableTitle>송장번호 : </S.TableTitle>
            <S.TableContent>{matchingObject?.iv_no}</S.TableContent>
          </S.Table>
          <S.Table>
            <S.TableTitle>업무구분 : </S.TableTitle>
            <S.TableContent>
              {matchingObject?.state === "DU"
                ? "미배송"
                : matchingObject?.state === "DS"
                ? "배송출발"
                : "배송완료"}
            </S.TableContent>
          </S.Table>
          <S.Table>
            <S.TableTitle>사원코드 : </S.TableTitle>
            <S.TableContent>{matchingObject?.tradesub_cd}</S.TableContent>
          </S.Table>
          <S.Table>
            <S.TableTitle>수신전화 : </S.TableTitle>
            <S.TableContent>{matchingObject?.dv_tel}</S.TableContent>
          </S.Table>
          <S.Table>
            <S.TableTitle>발송일 : </S.TableTitle>
            <S.TableContent>{matchingObject?.update_date}</S.TableContent>
          </S.Table>
          <S.Table>
            <S.TableTitle>성공여부 : </S.TableTitle>
            <S.TableContent>
              {matchingObject?.success === "1" ? "성공" : "실패"}
            </S.TableContent>
          </S.Table>
          <S.Table>
            <S.TableTitle>택배사 : </S.TableTitle>
            <S.TableContent>{matchingObject?.company}</S.TableContent>
          </S.Table>
        </S.TableContainer>
      </S.ImageTableContainer>
      <S.MMSContainer>
        <pre>{matchingObject?.mms_content}</pre>
      </S.MMSContainer>
    </S.Container>
  );
}
