import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/appProduct.styles";
import {
  IAppProductData,
  IFilterOption,
} from "../../types/appSet/appProduct.types";
import Pagination from "../../components/common/Pagination";
import { getAppProductList } from "../../api/appSet/getAppProductList";
import Loading from "../../components/common/Loading";

export default function AppProduct() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterOption, setFilterOption] = useState<IFilterOption>({
    tradeSubTelephone: "",
    tradeSubCode: null,
    productName: "",
    productCategory: "",
  });
  const [appProductList, setAppProductList] = useState<IAppProductData[]>([]);

  const { mutate: appProductListMutate, isLoading: isAppProductListLoading } =
    getAppProductList(page, setTotal, filterOption, setAppProductList);

  useEffect(() => {
    appProductListMutate();
  }, []);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilterOption({ ...filterOption, [name]: value });
  };

  const onClickSearch = () => {
    setPage(1);
    appProductListMutate();
  };

  return (
    <S.Container>
      <S.FilterContainer>
        <S.Input
          placeholder="전화번호"
          name="tradeSubTelephone"
          onChange={(e) => handleOptionChange(e)}
        />
        <S.Input
          placeholder="사원코드"
          name="tradeSubCode"
          onChange={(e) => handleOptionChange(e)}
        />
        <S.Input
          placeholder="제품명"
          name="productName"
          onChange={(e) => handleOptionChange(e)}
        />
        <S.Input
          placeholder="제품분류"
          name="productCategory"
          onChange={(e) => handleOptionChange(e)}
        />
        <CommonButton contents="검색" onClickFn={onClickSearch} />
      </S.FilterContainer>

      <S.TitleContainer>
        <S.Title>전화번호</S.Title>
        <S.Title>사원코드</S.Title>
        <S.Title>제품명</S.Title>
        <S.Title>제품분류</S.Title>
        <S.Title>MAC 주소</S.Title>
        <S.Title>등록일시</S.Title>
      </S.TitleContainer>
      <S.ContentsListContainer>
        {isAppProductListLoading ? (
          <Loading />
        ) : appProductList.length < 1 ? (
          <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
        ) : (
          appProductList.map((item) => (
            <S.ContentsContainer key={item.id}>
              <S.Contents>{item.tradesub_tel}</S.Contents>
              <S.Contents>{item.tradesub_cd}</S.Contents>
              <S.Contents>{item.product_name}</S.Contents>
              <S.Contents>{item.product_category}</S.Contents>
              <S.Contents>{item.mac_address}</S.Contents>
              <S.Contents>{item.reg_date}</S.Contents>
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsListContainer>

      <S.PaginationContainer>
        <Pagination
          total={total}
          page={page}
          setPage={setPage}
          mutate={appProductListMutate}
        />
      </S.PaginationContainer>
    </S.Container>
  );
}
