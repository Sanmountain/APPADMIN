import dayjs from "dayjs";
import * as XLSX from "xlsx-color";
import { IExcelFilter, IMMSInvoiceList } from "../types/mms/alimtokList.types";

const merges = [
  // 타이틀
  { s: { r: 1, c: 1 }, e: { r: 2, c: 5 } }, // B2:F3

  { s: { r: 1, c: 8 }, e: { r: 2, c: 10 } }, // I2:K3

  { s: { r: 1, c: 12 }, e: { r: 2, c: 14 } }, // M2:O3

  { s: { r: 1, c: 16 }, e: { r: 2, c: 19 } }, // Q2:T3

  { s: { r: 11, c: 1 }, e: { r: 11, c: 6 } }, // B12:G12

  { s: { r: 18, c: 1 }, e: { r: 18, c: 6 } }, // B19:G19

  // SLX MMS 전송
  { s: { r: 5, c: 1 }, e: { r: 7, c: 1 } }, // B6:B8

  { s: { r: 5, c: 4 }, e: { r: 7, c: 4 } }, // E6:E8

  { s: { r: 5, c: 5 }, e: { r: 7, c: 5 } }, // F6:F8

  // SLX 알림톡 전송
  { s: { r: 13, c: 1 }, e: { r: 14, c: 1 } }, // B14:B15

  { s: { r: 13, c: 2 }, e: { r: 14, c: 2 } }, // C14:C15

  { s: { r: 13, c: 3 }, e: { r: 14, c: 3 } }, // D14:D15

  { s: { r: 13, c: 4 }, e: { r: 14, c: 4 } }, // E14:E15

  { s: { r: 13, c: 5 }, e: { r: 14, c: 5 } }, // F14:F15

  { s: { r: 13, c: 6 }, e: { r: 14, c: 6 } }, // G14:G15

  // 합계
  { s: { r: 21, c: 1 }, e: { r: 23, c: 1 } }, // B22:B24
  { s: { r: 24, c: 1 }, e: { r: 24, c: 4 } }, // B25:E25

  // SLX 송장 표 타이틀
  { s: { r: 4, c: 8 }, e: { r: 5, c: 8 } }, // I5:I6
  { s: { r: 4, c: 9 }, e: { r: 5, c: 9 } }, // J5:J6
  { s: { r: 4, c: 10 }, e: { r: 5, c: 10 } }, // K5:K6

  // KB 송장 표 타이틀
  { s: { r: 4, c: 12 }, e: { r: 5, c: 14 } }, // M5:O6
  { s: { r: 6, c: 12 }, e: { r: 7, c: 14 } }, // M7:O8

  // 알림톡 송장 표 타이틀
  { s: { r: 4, c: 16 }, e: { r: 5, c: 16 } }, // Q5:Q6
  { s: { r: 4, c: 17 }, e: { r: 5, c: 17 } }, // R5:R6
  { s: { r: 4, c: 18 }, e: { r: 5, c: 18 } }, // S5:S6
  { s: { r: 4, c: 19 }, e: { r: 5, c: 19 } }, // T5:T6
];

export const MMSExcelDownload = (
  excelFilter: IExcelFilter,
  finishAlimList: IMMSInvoiceList[],
  startAlimList: IMMSInvoiceList[],
  finishLMSList: IMMSInvoiceList[],
  startLMSList: IMMSInvoiceList[],
) => {
  // NOTE 엑셀 시트 생성
  const excelSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

  // NOTE 파일 생성한 날짜 가져와서 파일명 만들기
  const month = dayjs(excelFilter.startDate).month() + 1;

  // NOTE 엑셀 영역 설정
  excelSheet["!ref"] = `A1:T999999`;

  // TODO 타이틀 삽입
  const addTitleToSheet = (column: string, row: number, title: string) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      v: title,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 25,
          bold: true,
          underline: true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      },
    };
  };

  // TODO 왼쪽 total 표 title
  const addTotalTitleToSheet = (
    column: string,
    row: number,
    title: string,
    isTotal: boolean,
  ) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      v: title,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
          bold: true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: isTotal ? { rgb: "FFFF00" } : { rgb: "DDEBF7" },
          bgColor: isTotal ? { rgb: "FFFF00" } : { rgb: "DDEBF7" },
        },
      },
    };
  };

  // TODO SLX 전송 표 채우기
  const addTotalTableToSheet = (
    column: string,
    row: number,
    contents: any,
    isTotal: boolean,
  ) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      f: `=${contents}`,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
          bold: isTotal && true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: isTotal ? { rgb: "FFFF00" } : { rgb: "ffffff" },
          bgColor: isTotal ? { rgb: "FFFF00" } : { rgb: "ffffff" },
        },
      },
    };
  };

  // TODO SLX 가격 안내 문구
  const addPriceToSheet = (column: string, row: number, contents: string) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      v: `${contents}`,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      },
    };
  };

  // TODO 합계 구분값 넣기
  const addCategoryToSheet = (
    column: string,
    row: number,
    contents: string | number,
  ) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      v: `${contents}`,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { rgb: "ffffff" },
          bgColor: { rgb: "ffffff" },
        },
      },
    };
  };

  // TODO 합계 테이블 총 합
  const addTotalToSheet = (
    column: string,
    row: number,
    contents: string | number,
    isTotal: boolean,
  ) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      f: isTotal && `=${contents}`,
      v: !isTotal && `${contents}`,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
          bold: true,
          color: { rgb: "FF0000" },
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { rgb: "FEC4D6" },
          bgColor: { rgb: "FEC4D6" },
        },
      },
    };
  };

  // TODO MMS SLX 리스트 뿌리기
  const addSLXToSheet = (
    column: string,
    startRow: number,
    isTitle: boolean,
  ) => {
    excelSheet[`${column}${startRow}`] = {
      t: "s",
      f: isTitle && `COUNT(${column}9:${column}999999)`,
      v:
        startRow === 8
          ? "송장번호"
          : column === "I" && startRow === 7
          ? "배송완료"
          : column === "J" && startRow === 7
          ? "배송출발"
          : "미배송",
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
          bold: startRow === 5 && true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: startRow === 5 ? "pattern" : "",
          pattern: startRow === 5 ? "solid" : "",
          fgColor: startRow === 5 ? { rgb: "DDEBF7" } : { rgb: "ffffff" },
          bgColor: startRow === 5 ? { rgb: "DDEBF7" } : { rgb: "ffffff" },
        },
      },
    };
  };

  // TODO MMS KB 리스트 뿌리기
  const addKBToSheet = (column: string, startRow: number, isTitle: boolean) => {
    excelSheet[`${column}${startRow}`] = {
      t: "s",
      f: isTitle && `COUNT(N9:N999999)`,
      v: startRow === 7 && "송장번호",
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
          bold: startRow === 5 && true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: startRow === 5 ? "pattern" : "",
          pattern: startRow === 5 ? "solid" : "",
          fgColor: startRow === 5 ? { rgb: "DDEBF7" } : { rgb: "ffffff" },
          bgColor: startRow === 5 ? { rgb: "DDEBF7" } : { rgb: "ffffff" },
        },
      },
    };
  };

  // TODO 알림톡 송장 리스트 뿌리기
  const addInvoicesToSheet = (
    invoiceList: IMMSInvoiceList[],
    column: string,
    startRow: number,
    title: string,
  ) => {
    // 카운트 값 삽입
    excelSheet[`${column}5`] = {
      t: "n",
      v: invoiceList.length,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
          bold: true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { rgb: "DDEBF7" },
          bgColor: { rgb: "DDEBF7" },
        },
      },
    };

    // 타이틀 삽입
    excelSheet[`${column}7`] = {
      t: "s",
      v: title,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "",
          pattern: "",
          fgColor: { rgb: "ffffff" },
          bgColor: { rgb: "ffffff" },
        },
      },
    };

    // '송장번호' 삽입
    excelSheet[`${column}8`] = {
      t: "s",
      v: "송장번호",
      s: {
        font: {
          name: "맑은 고딕",
          sz: 11,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        fill: {
          type: "",
          pattern: "",
          fgColor: { rgb: "ffffff" },
          bgColor: { rgb: "ffffff" },
        },
      },
    };

    for (let i = 0; i < invoiceList.length; i++) {
      const cellRef = `${column}${startRow + i}`;
      excelSheet[cellRef] = {
        t: "s",
        v: invoiceList[i].iv_no,
        s: {
          font: {
            name: "맑은 고딕",
            sz: 11,
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
        },
      };
    }
  };

  // 큰 title
  addTitleToSheet("B", 2, `SLX MMS 전송 (${month}월)`);
  addTitleToSheet("B", 12, `SLX 알림톡 전송 (${month}월)`);
  addTitleToSheet("B", 19, `합계 (${month}월)`);
  addTitleToSheet("I", 2, `${month}월 MMS(SLX) 송장 리스트`);
  addTitleToSheet("M", 2, `${month}월 MMS(KB) 송장 리스트`);
  addTitleToSheet("Q", 2, `${month}월 알림톡송장 리스트`);

  // SLX MMS 전송
  addTotalTitleToSheet("B", 5, "해당 월", false);
  addTotalTitleToSheet("C", 5, "구분", false);
  addTotalTitleToSheet("D", 5, "SLX 전송량", false);
  addTotalTitleToSheet("E", 5, "KB 전송량", false);
  addTotalTitleToSheet("F", 5, "총 청구 건", false);
  addTotalTitleToSheet("B", 6, `${month}월`, false);
  addTotalTitleToSheet("B", 9, "합계", true);
  addTotalTitleToSheet("C", 9, "", true);

  addTotalTableToSheet("C", 6, "I7", false);
  addTotalTableToSheet("C", 7, "J7", false);
  addTotalTableToSheet("C", 8, "K7", false);
  addTotalTableToSheet("D", 6, "I5", false);
  addTotalTableToSheet("D", 7, "J5", false);
  addTotalTableToSheet("D", 8, "K5", false);
  addTotalTableToSheet("E", 6, `${excelFilter.transferRate || 0}`, false);
  addTotalTableToSheet("F", 6, "D6+D7+D8+E6", false);
  addTotalTableToSheet("D", 9, "D6+D7+D8", true);
  addTotalTableToSheet("E", 9, "E6", true);
  addTotalTableToSheet("F", 9, "F6", true);

  // SLX 알림톡 전송
  addTotalTitleToSheet("B", 13, "사용 월", false);
  addTotalTitleToSheet("C", 13, "알림톡(건수)", false);
  addTotalTitleToSheet("D", 13, "알림톡(금액)", false);
  addTotalTitleToSheet("E", 13, "LMS(건수)", false);
  addTotalTitleToSheet("F", 13, "LMS(금액)", false);
  addTotalTitleToSheet("G", 13, "총액", false);
  addTotalTitleToSheet("B", 14, `${month}월 청구`, false);
  addTotalTitleToSheet("B", 16, "합계", true);

  addTotalTableToSheet("C", 14, "Q5+R5", false);
  addTotalTableToSheet("D", 14, "C14*8.5", false);
  addTotalTableToSheet("E", 14, "S5+T5", false);
  addTotalTableToSheet("F", 14, "E14*27.9", false);
  addTotalTableToSheet("G", 14, "D14+F14", false);
  addTotalTableToSheet("C", 16, "C14", true);
  addTotalTableToSheet("D", 16, "D14", true);
  addTotalTableToSheet("E", 16, "E14", true);
  addTotalTableToSheet("F", 16, "F14", true);
  addTotalTableToSheet("G", 16, "G14", true);

  addPriceToSheet("B", 17, "※LMS");
  addPriceToSheet("C", 17, "27.9원");
  addPriceToSheet("B", 18, "※알림톡");
  addPriceToSheet("C", 18, "8.5원");

  // 합계
  addTotalTitleToSheet("B", 21, "사용 월", false);
  addTotalTitleToSheet("C", 21, "구분", false);
  addTotalTitleToSheet("D", 21, "전송량", false);
  addTotalTitleToSheet("E", 21, "단가", false);
  addTotalTitleToSheet("F", 21, "금액", false);
  addTotalTitleToSheet("G", 21, "비고", false);
  addTotalTitleToSheet("B", 22, `${month}월`, false);

  addCategoryToSheet("C", 22, "MMS");
  addCategoryToSheet("C", 23, "알림톡");
  addCategoryToSheet("C", 24, "LMS");
  addTotalTableToSheet("D", 22, "F6", false);
  addTotalTableToSheet("D", 23, "C14", false);
  addTotalTableToSheet("D", 24, "E14", false);
  addCategoryToSheet("E", 22, 3);
  addCategoryToSheet("E", 23, 8.5);
  addCategoryToSheet("E", 24, 27.9);
  addTotalTableToSheet("F", 22, "D22*E22", false);
  addTotalTableToSheet("F", 23, "D23*E23", false);
  addTotalTableToSheet("F", 24, "D24*E24", false);
  addCategoryToSheet("G", 22, "");
  addCategoryToSheet("G", 23, "");
  addCategoryToSheet("G", 24, "");

  addTotalToSheet("B", 25, "Total 청구", false);
  addTotalToSheet("F", 25, "F22+F23+F24", true);
  addTotalToSheet("G", 25, "", false);

  // MMS(SLX) 송장 리스트
  addSLXToSheet("I", 5, true);
  addSLXToSheet("J", 5, true);
  addSLXToSheet("K", 5, true);
  addSLXToSheet("I", 7, false);
  addSLXToSheet("J", 7, false);
  addSLXToSheet("K", 7, false);
  addSLXToSheet("I", 8, false);
  addSLXToSheet("J", 8, false);
  addSLXToSheet("K", 8, false);

  // MMS(KB) 송장 리스트
  addKBToSheet("M", 5, true);
  addKBToSheet("M", 7, false);

  // 알림톡 송장 리스트
  addInvoicesToSheet(finishAlimList, "Q", 9, "배송완료(알림톡)");
  addInvoicesToSheet(startAlimList, "R", 9, "배송출발(알림톡)");
  addInvoicesToSheet(finishLMSList, "S", 9, "배송완료(LMS)");
  addInvoicesToSheet(startLMSList, "T", 9, "배송출발(LMS)");

  excelSheet["!cols"] = [
    { wch: 2 }, // A
    { wch: 10 }, // B
    { wch: 15 }, // C
    { wch: 12 }, // D
    { wch: 12 }, // E
    { wch: 14 }, // F
    { wch: 14 }, // G
    { wch: 3 }, // H
    { wch: 18 }, // I
    { wch: 18 }, // J
    { wch: 18 }, // K
    { wch: 3 }, // L
    { wch: 18 }, // M
    { wch: 18 }, // N
    { wch: 18 }, // O
    { wch: 3 }, // P
    { wch: 18 }, // Q
    { wch: 18 }, // R
    { wch: 18 }, // S
    { wch: 18 }, // T
  ];

  // NOTE 엑셀 파일 생성
  const excelBook: XLSX.WorkBook = {
    Sheets: { "MMS 송장 알림톡 송장": excelSheet },
    SheetNames: ["MMS 송장 알림톡 송장"],
  };

  // NOTE 열 병합 설정
  excelBook.Sheets["MMS 송장 알림톡 송장"]["!merges"] = merges;
  // NOTE 엑셀 다운로드
  const buffer = XLSX.write(excelBook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return blob;
};
