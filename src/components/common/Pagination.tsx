import { useState, memo, useEffect } from "react";
import * as S from "../../styles/Pagination.styles";
import { IPaginationProps } from "../../types/Pagination.types";

function Pagination({ total, page, setPage, mutate }: IPaginationProps) {
  const [currentPageGroup, setCurrentPageGroup] = useState(0);

  // NOTE 총 페이지 수
  const numPages = Math.max(total, 1);
  // NOTE 한 그룹 당 보여줄 페이지 수
  const pagesPerGroup = 10;
  // NOTE 페이지네이션이 갖고 있는 페이지 그룹의 수
  const numPageGroups = Math.ceil(numPages / pagesPerGroup);

  // NOTE 그룹의 마지막 페이지를 보고 있을 때 다음 그룹으로 넘어갈 경우
  useEffect(() => {
    setCurrentPageGroup(Math.floor((page - 1) / pagesPerGroup));
    mutate();
  }, [page, pagesPerGroup]);

  const onClickFirstButton = () => {
    setPage(1);
    setCurrentPageGroup(0);
  };

  const onClickPrevButton = () => {
    if (page === currentPageGroup * pagesPerGroup + 1 && currentPageGroup > 0) {
      // NOTE 이전 페이지 그룹의 마지막 페이지로 이동
      setPage(currentPageGroup * pagesPerGroup - 1);
      setCurrentPageGroup(currentPageGroup - 1);
    } else {
      // NOTE 이전 페이지로 이동
      setPage(page - 1);
    }
  };

  const onClickNextButton = () => {
    const isAtEndOfCurrentGroup = page % pagesPerGroup === 0;
    const isNotLastGroup = currentPageGroup < numPageGroups - 1;

    if (isAtEndOfCurrentGroup && isNotLastGroup) {
      // NOTE 다음 페이지 그룹의 첫 페이지로 이동
      setPage((currentPageGroup + 1) * pagesPerGroup);
      setCurrentPageGroup(currentPageGroup + 1);
    } else {
      // NOTE 다음 페이지로 이동
      setPage(page + 1);
    }
  };

  const onClickLastButton = () => {
    setPage(numPages);
    setCurrentPageGroup(numPageGroups - 1);
  };

  const onClickPageButton = (index: number) => {
    const actualPageIndex = currentPageGroup * pagesPerGroup + index;
    setPage(actualPageIndex);
  };

  return (
    <S.Container>
      <S.PaginationButton onClick={onClickFirstButton} disabled={page === 1}>
        <S.FirstIcon />
      </S.PaginationButton>
      <S.PaginationButton onClick={onClickPrevButton} disabled={page === 1}>
        <S.PrevIcon />
      </S.PaginationButton>
      {Array(numPages)
        .fill(0)
        .slice(
          currentPageGroup * pagesPerGroup,
          (currentPageGroup + 1) * pagesPerGroup,
        )
        .map((_, index) => {
          const actualPageNumber = index + currentPageGroup * pagesPerGroup + 1;

          return (
            <S.PaginationButton
              key={actualPageNumber}
              onClick={() => onClickPageButton(index + 1)}
              aria-current={page === actualPageNumber ? "page" : undefined}
            >
              {actualPageNumber}
            </S.PaginationButton>
          );
        })}
      <S.PaginationButton
        onClick={onClickNextButton}
        disabled={page === numPages}
      >
        <S.NextIcon />
      </S.PaginationButton>
      <S.PaginationButton
        onClick={onClickLastButton}
        disabled={page === numPages}
      >
        <S.LastIcon />
      </S.PaginationButton>
    </S.Container>
  );
}

export default memo(Pagination);
