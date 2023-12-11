import { ChangeEvent, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/appProduct.styles";
import { getAppPaymentHistory } from "../../api/appSet/getAppPaymentHistory";
import QueryPagination from "../../components/common/QueryPagination";

export default function AppPaymentHistory() {
  const [filter, setFilter] = useState({ name: "", phoneNumber: "" });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const { data, refetch } = getAppPaymentHistory(filter, page, setTotal);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilter({ ...filter, [name]: value });
  };

  const onClickSearch = () => {
    setPage(1);
    refetch();
  };

  return (
    <S.Container>
      <S.FilterContainer>
        <S.Input
          placeholder="이름"
          name="name"
          onChange={(e) => handleFilterChange(e)}
        />
        <S.Input
          placeholder="전화번호"
          name="phoneNumber"
          onChange={(e) => handleFilterChange(e)}
        />
        <CommonButton contents="검색" onClickFn={onClickSearch} />
      </S.FilterContainer>

      <S.TitleContainer className="history">
        <S.Title>아이디</S.Title>
        <S.Title>이름</S.Title>
        <S.Title>전화번호</S.Title>
        <S.Title>결제일</S.Title>
        <S.Title>결제방식</S.Title>
        <S.Title>결제금액</S.Title>
      </S.TitleContainer>

      <S.ContentsListContainer>
        {data?.list.map((el) => (
          <S.ContentsContainer className="history" key={el.id}>
            <S.Contents>{el.tradesub_cd}</S.Contents>
            <S.Contents>{el.order_name}</S.Contents>
            <S.Contents>{el.phone_no}</S.Contents>
            <S.Contents>{el.reg_date}</S.Contents>
            <S.Contents>{el.pay_method}</S.Contents>
            <S.Contents>{Number(el.amount).toLocaleString()} 원</S.Contents>
          </S.ContentsContainer>
        ))}
      </S.ContentsListContainer>

      <S.PaginationContainer>
        <QueryPagination total={total} page={page} setPage={setPage} />
      </S.PaginationContainer>
    </S.Container>
  );
}
