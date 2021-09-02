import styled from "styled-components";

import { media } from "../utils/mediaQuery";
import * as color from "../utils/color";

export const CorrectAnswer = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

export const Table = styled.table`
  margin-bottom: 40px;
  width: 100%;
  border-collapse: collapse;
  background: ${color.pureWhite};
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  & > caption {
    padding: 10px 0;
  }
  & td {
    border: 1px solid ${color.gray};
    padding: 15px;
    ${media.phone`
      padding:5px;
      font-size:1.5rem;
    `}
    &:nth-child(1) {
      width: 1px;
      white-space: nowrap;
      text-align: right;
    }

    & > span {
      display: inline-block;
      width: 62px;
      text-align: right;
    }
  }
`;

export const ScoreTitle = styled.h2`
  display: inline-block;
  user-select: none;
  &::after {
    margin-left: 20px;
    vertical-align: -70%; /* 下端を揃える */
    display: inline-block;
    content: "";
    width: 80px;
    height: 80px;
    background-image: url("./image/akey-score.png");
    background-repeat: no-repeat;
    background-size: contain;
    ${media.phone`
      display:none;
    `}
  }
`;
