import { useNavigate } from "react-router";
import * as S from "../../../styles/mms/MMSTrackingDetail.styles";

export default function MMSTrackingDetail() {
  const navigate = useNavigate();

  const onClickMoveToBack = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.BackIcon onClick={onClickMoveToBack} />
      </S.TopContainer>

      <S.TableContainer>
        <S.SeparateContainer>
          <S.ContentsContainer>
            <S.Title>송장번호</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>아이디</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>이름</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>송하인번호</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>수하인번호</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
        </S.SeparateContainer>
        <S.SeparateContainer>
          <S.ContentsContainer>
            <S.Title>송장상태(구분)</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>현재상태</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>전송일자</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
          <S.ContentsContainer>
            <S.Title>서비스코드</S.Title>
            <S.Contents></S.Contents>
          </S.ContentsContainer>
        </S.SeparateContainer>
      </S.TableContainer>
    </S.Container>
  );
}
