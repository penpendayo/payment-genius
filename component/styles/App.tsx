import styled, { css, keyframes } from "styled-components";

import { media } from "../utils/mediaQuery";
import { addUrlPrefix } from "../utils/addUrlPrefix";
import * as color from "../utils/color";
/* ----------------------------------------main---------------------------------------- */
export const GridContainer = styled.div`
  display: grid;
  grid-template:
    "........... accounting    ...........  paidMoney    paidMoney   paidMoney   ..........." 290px
    "........... ...........   ...........  ...........  ........... ........... ..........." 10px
    "........... ...........   ...........  paidPrice    payBtn      change      ..........." 50px
    "........... ...........   ...........  ...........  ........... ........... ..........." 10px
    "........... wallet        ...........  myMoney      myMoney     myMoney     ..........." 290px
    "........... ...........   ...........  ...........  ........... ........... ..........." 10px
    "........... score         score        score        score       score       ..........."
    / auto 250px 10px 200px 200px 200px auto;

  ${media.phone`    
    grid-template:
      ".......... accounting accounting   accounting  .........." 70px
      ".......... .......... ............ ........... .........." 10px
      ".......... paidMoney  paidMoney    paidMoney   .........." 250px
      ".......... .......... ............ ........... .........." 10px
      ".......... paidPrice  payBtn       change      .........." 50px
      ".......... .......... ............ ........... .........." 10px
      ".......... myMoney    myMoney      myMoney     .........." 250px
      ".......... score      score        score       .........."
      ".......... footer     footer       footer      .........."
      /6px 1fr 1fr 1fr 6px;
`}
`;
export const Wallet = styled.div`
  @keyframes OpenWalletAnimation {
    0% {
      transform: scale(1, 1) translate(0%, 0%);
    }
    15% {
      transform: scale(0.9, 0.9) translate(0%, 5%);
    }
    30% {
      transform: scale(1.2, 0.8) translate(0%, 10%);
    }
    50% {
      transform: scale(0.8, 1.2) translate(0%, -10%);
    }
    70% {
      transform: scale(1.1, 0.9) translate(0%, 5%);
    }
    100% {
      transform: scale(1, 1) translate(0%, 0%);
    }
  }
  grid-area: wallet;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: backwards OpenWalletAnimation 1.3s 1 0.1s;
  & > img {
    width: 70%;
  }
  ${media.phone`
    display:none;
  `}
`;
export const Accounting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: accounting;
  & > div {
    font-size: 3rem;
    background-color: ${color.darkGray};
    color: ${color.white};
    text-align: center;
    width: 90%;
    height: 100px;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > img {
    width: 70%;
    height: 147px;
    ${media.phone`
      display:none;
    `}
  }
`;

export const Subtotal = styled.span<{ animationTime: number }>`
  ${({ animationTime }) => {
    const keyframe = keyframes`
    0% {
      transform: scale(1) translateY(-50px);
      opacity:0;
    }
    30%{
      opacity:1;
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }`;

    return css`
      animation: backwards ${keyframe} 0.6s 1 ${animationTime}s;
    `;
  }}
`;

const paidAndChangeCommon = css`
  font-size: 2.3rem;
  align-items: center;
  display: flex;
  ${media.phone`    
    font-size:1.8rem;
    background-size:30px 30px;
  `}
`;
export const Paid = styled.div`
  grid-area: paidPrice;
  margin-right: 40px;
  justify-content: flex-end;
  background: url(${addUrlPrefix("/image/arrowup.svg")}) no-repeat left/contain;
  ${paidAndChangeCommon};
  ${media.phone`    
    margin-right: 10px;
  `}
`;

export const Change = styled.div`
  grid-area: change;
  justify-content: flex-start;
  margin-left: 20px;
  text-align: left;
  background: url(${addUrlPrefix("/image/arrowdown.svg")}) no-repeat
    right/contain;
  animation: both appear 3s 1 0.4s;
  ${paidAndChangeCommon}
  ${media.phone`    
    margin-left: 10px;
  `}
`;
export const Answer = styled.div`
  @keyframes appear {
    0% {
      opacity: 0;
    }
    1%,
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  animation: both appear 1.9s 1 0.4s;
  grid-area: paidMoney;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const answerCommon = () => {
  const keyframe = keyframes`
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
    `;
  return css`
    background-repeat: no-repeat;
    width: 250px;
    height: 250px;
    background-size: 100px 100px, contain;
    background-position: right bottom, center;
    z-index: 100;
    display: flex;
    animation: backwards ${keyframe} 0.1s 1 0.4s;
  `;
};
export const CorrectAnswer = styled.div`
  ${answerCommon()}
  background-image: url("./image/akey-yorokobu.png"), url("./image/correct.png");
`;
export const IncorrectAnswer = styled.div`
  ${answerCommon()}
  background-image: url("./image/akey-kanasimu.png"), url("./image/incorrect.png");
  justify-content: flex-end;
  flex-direction: column;
`;

export const Score = styled.section`
  grid-area: score;
`;
export const Pay = styled.div`
  grid-area: payBtn;
  display: flex;
  width: 100%;
  height: 100%;
`;
export const PayBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: ${color.green};
  color: ${color.white};
  font-weight: bold;
  border-radius: 10px;
  transition: all 0.1s;
  font-size: 2rem;
  &:hover {
    background: ${color.green};
    color: ${color.white};
    margin-left: 0px;
    margin-top: 0px;
    box-shadow: none;
    &:enabled {
      cursor: pointer;
    }
  }
  &:disabled {
    background: ${color.gray};
    color: transparent;
    text-shadow: 0 0 0 white;
  }
`;
