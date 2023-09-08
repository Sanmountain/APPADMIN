import { useNavigate, useParams } from "react-router";
import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/mms/TalkSendPhoto.styles";
import { useRecoilValue } from "recoil";
import { talkSendListState } from "../../../stores/talkSendListState";
import NotFound from "../../../assets/image/img_notFound.jpg";
import { loginState } from "../../../stores/loginState";
import { ChangeEvent, useEffect, useState } from "react";

export default function TalkSendPhoto() {
  const [imageUrl, setImageUrl] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState<number | null>(null);
  const talkSendList = useRecoilValue(talkSendListState);
  const login = useRecoilValue(loginState);

  const navigate = useNavigate();
  const params = useParams();
  const talkSendId = params.id;

  // NOTE list에서 일치하는 id로 image_uri 끌고오기
  useEffect(() => {
    const matchingTalkSend = talkSendList.find(
      (item) => item.mid === talkSendId,
    );

    if (matchingTalkSend) setInvoiceNumber(Number(matchingTalkSend.iv_no));
    if (matchingTalkSend) setImageUrl(matchingTalkSend.image_uri);
  }, []);

  const onClickBackButton = () => {
    navigate(-1);
  };

  const handleInvoiceNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setInvoiceNumber(Number(e.target.value));
  };

  const onClickSearch = () => {
    setImageUrl(
      `https://jhcfile.jhcon.net/FILE_SERVER/slx/file_download?fileName=${login.company}_${invoiceNumber}.jpg`,
    );
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.BackIcon onClick={onClickBackButton} />
        택배사 :{" "}
        <S.SelectBox value={login.company}>
          <option value="">회사</option>
          <option value={login.company}>{login.company}</option>
        </S.SelectBox>
        <S.Input
          defaultValue={invoiceNumber || undefined}
          onChange={handleInvoiceNumber}
          placeholder="송장번호"
        />
        <CommonButton contents="검색" onClickFn={onClickSearch} />
      </S.TopContainer>
      <S.ImageContainer>
        <S.Image
          src={imageUrl || NotFound}
          onError={(e) => (e.currentTarget.src = NotFound)}
        />
      </S.ImageContainer>
    </S.Container>
  );
}
