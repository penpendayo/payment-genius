import { css, CSSObject, SimpleInterpolation } from "styled-components";

export const media = {
  phone: (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (max-width: 599px) {
      ${css(first, ...interpolations)}
    }
  `,
};

//Todo: aaaaaaaaaaTree
