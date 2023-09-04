import { useParams } from "react-router";
import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/mms/TalkSendPhoto.styles";
import { useRecoilValue } from "recoil";
import { talkSendListState } from "../../../stores/talkSendListState";
import NotFound from "../../../assets/image/img_notFound.jpg";
import { loginState } from "../../../stores/loginState";
import { ChangeEvent, useEffect, useState } from "react";
import { getAlimtokInvoice } from "../../../api/mms/getAlimtokInvoice";

export default function TalkSendPhoto() {
  const [imageUrl, setImageUrl] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState<number | null>(null);
  const talkSendList = useRecoilValue(talkSendListState);
  const login = useRecoilValue(loginState);

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

  // NOTE 다른 송장번호 검색
  const { mutate: invoiceMutate } = getAlimtokInvoice(
    invoiceNumber,
    setImageUrl,
  );

  const handleInvoiceNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setInvoiceNumber(Number(e.target.value));
  };

  const onClickSearch = () => {
    invoiceMutate();
  };

  return (
    <S.Container>
      <S.TopContainer>
        택배사 :{" "}
        <S.SelectBox value={login.company}>
          <option value="">회사</option>
          <option value={login.company}>{login.company}</option>
        </S.SelectBox>
        <S.Input
          defaultValue={invoiceNumber || undefined}
          onChange={handleInvoiceNumber}
        />
        <CommonButton contents="검색" onClickFn={onClickSearch} />
      </S.TopContainer>
      <S.ImageContainer>
        <S.Image src={imageUrl || NotFound} />
      </S.ImageContainer>
    </S.Container>
  );
}
