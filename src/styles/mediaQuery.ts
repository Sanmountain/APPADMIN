import { breakPoints } from "./breakPoints";

export const mediaQuery = (
  Object.keys(breakPoints) as Array<keyof typeof breakPoints>
).reduce(
  (acc, key) => {
    acc[key] = (
      style: TemplateStringsArray,
    ) => `@media screen and (max-width: ${breakPoints[key]}px) {
      ${style}
    }`;
    return acc;
  },
  {} as {
    [key in keyof typeof breakPoints]: (style: TemplateStringsArray) => string;
  },
);
