import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { IExcelFilter, IMMSInvoiceList } from "../types/mms/alimtokList.types";
// import * as XLSXColor from "xlsx-color";

export const excelDownload = (
  excelFilter: IExcelFilter,
  finishAlimList: IMMSInvoiceList[],
  startAlimList: IMMSInvoiceList[],
  finishLMSList: IMMSInvoiceList[],
  startLMSList: IMMSInvoiceList[],
) => {
  // NOTE 파일 생성한 날짜 가져와서 파일명 만들기
  const today = dayjs();
  const year = today.year();
  const month = today.month() + 1;
  const fileName = `${excelFilter.company}_계산서 발행(MMS APP이용)_${year}_${month}월.xlsx`;

  console.log(startAlimList, finishLMSList, startLMSList);

  // NOTE 엑셀 시트 생성
  const excelSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

  // NOTE 알림톡 송장 리스트 뿌리기
  // NOTE 배송완료 (알림톡)
  //   if (!excelSheet["!merges"]) excelSheet["!merges"] = [];
  //   excelSheet["!merges"].push({ s: { r: 4, c: 16 }, e: { r: 5, c: 16 } });

  const finishAlimListCount = finishAlimList.length;
  //   if (!excelSheet["Q5"]) {
  //     excelSheet["Q5"] = {};
  //   }
  //   excelSheet["Q5"].f = `COUNT(Q9:Q${9 + finishAlimListCount - 1})`;
  //   excelSheet["Q7"].v = "배송완료(알림톡)";
  //   excelSheet["Q8"].v = "송장번호";
  for (let i = 0; i < finishAlimListCount; i++) {
    const finishAlimInvoice = finishAlimList[i].iv_no;
    XLSX.utils.sheet_add_json(excelSheet, [[""]], {
      origin: `Q${i + 9}`,
    });
    excelSheet[`Q${i + 9}`].v = finishAlimInvoice;
    // excelSheet[`Q${i + 9}`].s = {
    //   alignment: { vertical: "center", horizontal: "center" },
    // };
  }

  // NOTE 배송출발 (알림톡)
  //   if (!excelSheet["!merges"]) excelSheet["!merges"] = [];
  //   excelSheet["!merges"].push({ s: { r: 4, c: 17 }, e: { r: 5, c: 17 } });

  const startAlimListCount = startAlimList.length;
  //   if (!excelSheet["R5"]) {
  //     excelSheet["R5"] = {};
  //   }
  //   excelSheet["R5"].f = `COUNT(R9:R${9 + startAlimListCount - 1})`;
  //   excelSheet["R7"].v = "배송출발(알림톡)";
  //   excelSheet["R8"].v = "송장번호";
  for (let i = 0; i < startAlimListCount; i++) {
    const startAlimInvoice = startAlimList[i].iv_no;
    XLSX.utils.sheet_add_json(excelSheet, [[""]], {
      origin: `R${i + 9}`,
    });
    excelSheet[`R${i + 9}`].v = startAlimInvoice;
    // excelSheet[`R${i + 9}`].s = {
    //   alignment: { vertical: "center", horizontal: "center" },
    // };
  }

  // NOTE 배송완료 (LMS)
  //   if (!excelSheet["!merges"]) excelSheet["!merges"] = [];
  //   excelSheet["!merges"].push({ s: { r: 4, c: 18 }, e: { r: 5, c: 18 } });

  const finishLMSListCount = finishLMSList.length;
  //   if (!excelSheet["S5"]) {
  //     excelSheet["S5"] = {};
  //   }
  //   excelSheet["S5"].f = `COUNT(S9:S${9 + finishLMSListCount - 1})`;
  //   excelSheet["S7"].v = "배송완료(LMS)";
  //   excelSheet["S8"].v = "송장번호";
  for (let i = 0; i < finishLMSListCount; i++) {
    const finishLMSInvoice = finishLMSList[i].iv_no;
    XLSX.utils.sheet_add_json(excelSheet, [[""]], {
      origin: `S${i + 9}`,
    });
    excelSheet[`S${i + 9}`].v = finishLMSInvoice;
    // excelSheet[`S${i + 9}`].s = {
    //   alignment: { vertical: "center", horizontal: "center" },
    // };
  }

  // NOTE 배송출발 (LMS)
  //   if (!excelSheet["!merges"]) excelSheet["!merges"] = [];
  //   excelSheet["!merges"].push({ s: { r: 4, c: 19 }, e: { r: 5, c: 19 } });

  const startLMSListCount = startLMSList.length;
  //   if (!excelSheet["T5"]) {
  //     excelSheet["T5"] = {};
  //   }
  //   excelSheet["T5"].f = `COUNT(T9:T${9 + startLMSListCount - 1})`;
  //   excelSheet["T7"].v = "배송출발(LMS)";
  //   excelSheet["T8"].v = "송장번호";
  for (let i = 0; i < startLMSListCount; i++) {
    const startLMSInvoice = startLMSList[i].iv_no;
    XLSX.utils.sheet_add_json(excelSheet, [[""]], {
      origin: `T${i + 9}`,
    });
    excelSheet[`T${i + 9}`].v = startLMSInvoice;
    // excelSheet[`T${i + 9}`].s = {
    //   alignment: { vertical: "center", horizontal: "center" },
    // };
  }

  // NOTE 엑셀 파일 생성
  const excelBook: XLSX.WorkBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(excelBook, excelSheet, "MMS 송장 알림톡 송장");

  XLSX.writeFile(excelBook, fileName);
};
