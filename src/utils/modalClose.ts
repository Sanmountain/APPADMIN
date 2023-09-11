import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

export default function modalClose(
  isDisplay: string,
  setIsDisplay: Dispatch<SetStateAction<string>>,
  outSide: RefObject<HTMLDivElement>,
) {
  const clickOutSide = (e: MouseEvent) => {
    if (
      isDisplay &&
      outSide.current &&
      !outSide.current?.contains(e.target as Node)
    ) {
      setIsDisplay("");
    }
  };

  document.addEventListener("click", clickOutSide as any);
  return () => document.removeEventListener("click", clickOutSide as any);
}
