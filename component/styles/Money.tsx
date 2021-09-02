import styled, { css, keyframes } from "styled-components";

import { media } from "../utils/mediaQuery";
import * as color from "../utils/color";

export const MoneyImageAndCount = styled.div<{ isDisplayTopMoney: boolean }>`
  width: 25%;
  align-items: center;
  position: relative;
  ${({ isDisplayTopMoney }) =>
    isDisplayTopMoney &&
    css`
      z-index: 1000;
    `}
  &::before {
    //アスペクト比を固定するための設定(padding-topを利用するヤツ)
    content: "";
    display: block;
    padding-top: 90%;
    ${media.phone`padding-top: 100%;`}
  }
  &:last-child {
    //千円札だけ横幅が2倍
    width: 50%;
    &::before {
      content: "";
      padding-top: 50%;
    }
  }
  & img {
    position: absolute;
    width: 70%;
    ${[...Array(6)].map(
      (_, i) =>
        css`
          &:nth-of-type(${i + 1}) {
            top: ${i * 7}px;
            left: ${i * 7}px;
          }
        `
    )}
    ${media.phone`width: 60%;`}
  }
`;

export const MoneyCount = styled.span<{ isAnimation: boolean }>`
  position: absolute;
  bottom: 1px;
  right: 1px;
  ${({ isAnimation }) => {
    const FadeMoneyCount = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
    }
    `;
    return (
      isAnimation &&
      css`
        animation: both ${FadeMoneyCount} 0.7s 1 1.8s;
      `
    );
  }}
`;

export const MoneyBox = styled.div<{ moneyType: string }>`
  user-select: none;
  padding: 50px;
  flex-wrap: wrap;
  display: flex;
  background: ${color.pureWhite};
  box-sizing: border-box;
  border-radius: 42px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-content: space-around;
  height: 100%;
  max-width: 600px;
  ${media.phone`
    padding: 5%;
  `}
  ${({ moneyType }) => {
    //お金がある場合はカーソルを有効にする
    const pointerEnable = css`
      & > div > div:not(div:empty) {
        cursor: pointer;
      }
    `;
    //score以外ではデフォルトで画像を非表示にしておく
    const imgAddTransparent = css`
      img {
        opacity: 0;
      }
    `;

    //手持ち　⇔　レジ皿のアニメーション
    const pushpullAnimation = {
      animation(minusSign: boolean) {
        const offset = 360; //これが移動距離
        const keyframe = (mobileOffset = 0) => keyframes`
          0% {      
            opacity: 1;
            transform: translateY(${
              minusSign ? -offset + mobileOffset : offset - mobileOffset
            }px);
          }
          100% {
            opacity: 1;
          }
          `;
        return css`
          .pushpull-enter-done:not(.fillup-appear-done) {
            animation: both ${keyframe()} 0.15s 1 0s;
            ${media.phone`
             animation: both ${keyframe(
               50
             )} 0.15s 1 0s;//50＝モバイル表示のときのオフセット
            `}
          }
        `;
      },
      push() {
        return this.animation(true);
      },
      pull() {
        return this.animation(false);
      },
    };

    //財布　⇒　手持ちのアニメーション（初回）
    const appearAndRefillAnimation = () =>
      [...Array(7)].reduce((acc, _, i) => {
        const tmp = [...Array(5)].reduce((acc2, _, j) => {
          const offsetX = i > 3 ? i - 3 : i + 1;
          const offsetY = i < 4 ? 2 : -2;
          return css`
            ${acc2}
            @keyframes AppearFirstMoney${i}${j} {
              0% {
                opacity: 0;
                transform: translateY(${offsetY * 33}px)
                  translateX(${offsetX * -200}px) scale(0.1);
              }
              100% {
                opacity: 1;
                transform: translateY(0px) translateX(0) scale(1);
              }
            }
            .fillup-appear-done:nth-of-type(${j + 1}),
            .refill-enter-done:nth-of-type(${j + 1}) {
              animation: both ${"AppearFirstMoney" + i + j} 0.6s 1
                ${0.3 + j / 10 + i * 0.1}s;
            }
          `;
        }, "");
        return css`
          ${acc} &>div:nth-of-type(${i + 1}) {
            ${tmp}
          }
        `;
      }, "");

    //財布　⇒　手持ちのアニメーション（初回以降）
    const RefillMoney = () => {
      const keyframe = keyframes`
        0% {  
          transform: translateY(-60px) translateX(-650px) scale(0.1);
        }
        100% {
          opacity: 1;
        }
      `;
      const cssCode = [...Array(5)].reduce(
        (acc, _, i) => css`
          ${acc} .refill-enter-done:nth-of-type(${i + 1}) {
            animation: both ${keyframe} 0.6s 1 ${i * 0.04}s;
          }
        `,
        ""
      );
      return css`
        & > div:nth-of-type(7) {
          ${cssCode}
        }
      `;
    };
    //レジ　⇒　手持ちのアニメーション
    const ReturnMoney = () =>
      [...Array(7)].reduce((acc, _, i) => {
        const tmp = [...Array(5)].reduce((acc2, _, j) => {
          const offsetX = i > 3 ? i - 3 : i + 1;
          const offsetY = i < 4 ? 2 : -2;
          const ReturnMoney = keyframes`
            0% {  
              opacity:0;
              transform: translateY(${offsetY * 33 - 340}px) translateX(${
            offsetX * -200
          }px) scale(0.1);
            }
            100% {
              opacity: 1;
            }
          `;
          return css`
            ${acc2} .payreturn-enter-done:nth-of-type(${j + 1}) {
              animation: both ${ReturnMoney} 0.5s 1 ${j * 0.04}s;
            }
          `;
        }, "");
        return css`
          ${acc} &>div:nth-of-type(${i + 1}) {
            ${tmp}
          }
        `;
      }, "");
    //レジ皿　⇒　レジのアニメーション
    const PayMoney = () =>
      [...Array(7)].reduce((acc, _, i) => {
        const tmp = [...Array(5)].reduce((acc2, _, j) => {
          const offsetX = i > 3 ? i - 3 : i + 1; //上段、下段のオフセット
          const offsetY = i < 4 ? 2 : -2;
          const ReturnMoney = keyframes`
            0% {  
              opacity:1;
            }
            100% {
              opacity: 0;
              transform: translateY(${offsetY * 33}px) translateX(${
            offsetX * -200
          }px) scale(0.1);
            }
          `;
          return css`
            ${acc2} .payreturn-exit:nth-of-type(${j + 1}) {
              animation: both ${ReturnMoney} 0.5s 1 ${0}s;
            }
          `;
        }, "");
        return css`
          ${acc} &>div:nth-of-type(${i + 1}) {
            ${tmp}
          }
        `;
      }, "");
    switch (moneyType) {
      case "score":
        return css`
          border-radius: 0px;
          box-shadow: none;
          justify-content: left;
        `;
      case "paid":
        return css`
          grid-area: paidMoney;
          ${pointerEnable}
          ${imgAddTransparent}
          ${pushpullAnimation.pull()}
          ${PayMoney()}
        `;
      case "my":
        return css`
          grid-area: myMoney;
          ${pointerEnable}
          ${imgAddTransparent}
          ${pushpullAnimation.push()}
          ${appearAndRefillAnimation()}
          ${ReturnMoney()}
          ${RefillMoney()}
        `;
      case "edu":
        return css`
          padding: 20px;
          max-width: 400px;
          width: 100%;
        `;
      default:
        return;
    }
  }}
`;
