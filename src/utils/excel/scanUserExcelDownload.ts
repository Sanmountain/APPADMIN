import * as XLSX from "xlsx-color";
import { IExcelFilter, IUserCount } from "../../types/appSet/appScanList.types";

export const scanUserExcelDownload = (
  excelFilter: IExcelFilter,
  SLXUserCode: string[],
  SLXUserCount: IUserCount[],
  KBUserCode: string[],
  KBUserCount: IUserCount[],
  UPLogisUserCode: string[],
  UPLogisUserCount: IUserCount[],
) => {
  // NOTE 엑셀 시트 생성
  const excelSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

  // NOTE 엑셀 영역 설정
  excelSheet["!ref"] = `A1:N999999`;

  // TODO 타이틀 삽입
  const addTitleToSheet = (column: string, row: number, title: string) => {
    excelSheet[`${column}${row}`] = {
      t: "s",
      v: title,
      s: {
        font: {
          name: "맑은 고딕",
          sz: 16,
          bold: true,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      },
    };
  };

  // TODO 테이블 타이틀 삽입
  const addTableTitleToSheet = (column: string, row: number, title: string) => {
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
          fgColor: { rgb: "70AD47" },
          bgColor: { rgb: "70AD47" },
        },
      },
    };
  };

  // TODO 사용자 사원코드 삽입
  const addUserCodeToSheet = (
    excelList: string[],
    column: string,
    startRow: number,
  ) => {
    for (let i = 0; i < excelList.length; i++) {
      const cellRef = `${column}${startRow + i}`;
      excelSheet[cellRef] = {
        t: "s",
        v: excelList[i],
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
            fgColor: { rgb: "FFFFFF" },
            bgColor: { rgb: "FFFFFF" },
          },
        },
      };
    }
  };

  // TODO 날짜 삽입
  const addDateToSheet = (
    excelList: IUserCount[],
    column: string,
    startRow: number,
  ) => {
    for (let i = 0; i < excelList.length; i++) {
      const cellRef = `${column}${startRow + i}`;
      excelSheet[cellRef] = {
        t: "s",
        v: excelList[i].scan_ymd2,
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
            fgColor: { rgb: "FFFFFF" },
            bgColor: { rgb: "FFFFFF" },
          },
        },
      };
    }
  };

  // TODO 사용자 삽입
  const addUserCountToSheet = (
    excelList: IUserCount[],
    column: string,
    startRow: number,
  ) => {
    // 가장 큰 값을 찾기
    let maxCount = 0;
    for (let i = 0; i < excelList.length; i++) {
      if (parseInt(excelList[i].count, 10) > maxCount) {
        maxCount = parseInt(excelList[i].count, 10);
      }
    }

    for (let i = 0; i < excelList.length; i++) {
      const isMaxValue = parseInt(excelList[i].count, 10) === maxCount;
      const cellRef = `${column}${startRow + i}`;
      excelSheet[cellRef] = {
        t: "s",
        v: excelList[i].count,
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
            fgColor: { rgb: isMaxValue ? "FFFF00" : "FFFFFF" },
            bgColor: { rgb: isMaxValue ? "FFFF00" : "FFFFFF" },
          },
        },
      };
    }
  };

  addTitleToSheet("B", 2, "SLX 택배");
  addTitleToSheet("G", 2, "KB 택배");
  addTitleToSheet("L", 2, "유피로지스");

  addTableTitleToSheet("B", 3, "날짜");
  addTableTitleToSheet("C", 3, "사용자");
  addTableTitleToSheet("D", 3, "사용자 사원코드");
  addTableTitleToSheet("G", 3, "날짜");
  addTableTitleToSheet("H", 3, "사용자");
  addTableTitleToSheet("I", 3, "사용자 사원코드");
  addTableTitleToSheet("L", 3, "날짜");
  addTableTitleToSheet("M", 3, "사용자");
  addTableTitleToSheet("N", 3, "사용자 사원코드");

  addUserCodeToSheet(SLXUserCode, "D", 4);
  addUserCodeToSheet(KBUserCode, "I", 4);
  addUserCodeToSheet(UPLogisUserCode, "N", 4);

  addDateToSheet(SLXUserCount, "B", 4);
  addDateToSheet(KBUserCount, "G", 4);
  addDateToSheet(UPLogisUserCount, "L", 4);

  addUserCountToSheet(SLXUserCount, "C", 4);
  addUserCountToSheet(KBUserCount, "H", 4);
  addUserCountToSheet(UPLogisUserCount, "M", 4);

  excelSheet["!cols"] = [
    { wch: 3 }, // A
    { wch: 12 }, // B
    { wch: 10 }, // C
    { wch: 15 }, // D
    { wch: 3 }, // E
    { wch: 3 }, // F
    { wch: 12 }, // G
    { wch: 10 }, // H
    { wch: 15 }, // I
    { wch: 3 }, // J
    { wch: 3 }, // K
    { wch: 15 }, // L
    { wch: 10 }, // M
    { wch: 15 }, // N
  ];

  // NOTE 엑셀 파일 생성
  const excelBook: XLSX.WorkBook = {
    Sheets: { [`${excelFilter.year}년 ${excelFilter.month}월`]: excelSheet },
    SheetNames: [`${excelFilter.year}년 ${excelFilter.month}월`],
  };

  // NOTE 엑셀 다운로드
  const buffer = XLSX.write(excelBook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return blob;
};
