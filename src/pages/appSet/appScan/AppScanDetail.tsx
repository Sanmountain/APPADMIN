import { useRecoilValue } from "recoil";
import * as S from "../../../styles/appSet/AppScanDetail.styles";
import { scanUserListState } from "../../../stores/scanUserListState";
import { useNavigate, useParams } from "react-router";

export default function AppScanDetail() {
  const scanUserList = useRecoilValue(scanUserListState);

  const navigate = useNavigate();
  const params = useParams<{ scanDate?: string }>();
  const scanDate = params.scanDate;

  const scanDetailList = scanUserList?.[scanDate || ""] || [];

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.BackIcon onClick={onClickBack} />
        <S.TextContainer>날짜 : {scanDate}</S.TextContainer>
        <S.TextContainer>사용자수 : {scanDetailList.length} 명</S.TextContainer>
      </S.TopContainer>

      <S.TitleContainer>
        <S.Title>사원코드</S.Title>
        <S.Title>전화번호</S.Title>
      </S.TitleContainer>
      <S.ContentsListContainer>
        {scanDetailList.map((item, index: number) => (
          <S.ContentsContainer key={index}>
            <S.Contents>{item.tradesub_cd}</S.Contents>
            <S.Contents>{item.tradesub_tel}</S.Contents>
          </S.ContentsContainer>
        ))}
      </S.ContentsListContainer>
    </S.Container>
  );
}
