import styled from "styled-components";

import { media } from "../utils/mediaQuery";
import * as color from "../utils/color";

export const ArticleContainer = styled.div`
  margin: 0 auto;
  width: 860px;
  ${media.phone`
      width:100%;
      margin:0 9px;
    `}
  h2 {
    padding: 10px 0 10px 10px;
    color: ${color.darkGray};
    border-left: solid 5px ${color.green};
    border-bottom: solid 2px ${color.green};
  }
  pre {
    background-color: ${color.darkGray};
    color: ${color.white};
    padding: 10px;
  }
  ol > li > ol {
    list-style-type: upper-roman;
  }
  ol > li > ol > li > ol {
    list-style-type: lower-latin;
  }
  & > ol {
    border: 2px solid ${color.darkGray};

    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 4px;
  }
`;

export const LargeFont = styled.span`
  font-weight: bold;
  font-size: 3rem;
  margin: 0 6px;
`;

export const Subtotal = styled(LargeFont)`
  background-color: ${color.darkGray};
  color: ${color.white};
  text-align: center;
  height: 50px;
  width: 160px;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
