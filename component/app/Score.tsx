import React from "react";

import Money from "./Money";
import * as S from "../styles/Score";
import type { MoneyType, GameScore } from "../types/common";

type Props = {
  gameScore: GameScore[];
  calcMoneyTotal: (money: MoneyType) => number;
  calcAnswer: (subtotal: number, myMoney: MoneyType) => MoneyType;
};

export default React.memo(function Score({
  gameScore,
  calcMoneyTotal,
  calcAnswer,
}: Props) {
  //履歴から正答数を返す
  const calcNumberOfCorrectAnswers = () => {
    return gameScore.reduce((acc, value) => {
      if (
        JSON.stringify(value.paidMoney) ===
        JSON.stringify(calcAnswer(value.subtotal, value.myMoney))
      ) {
        return ++acc;
      } else return acc;
    }, 0);
  };
  //個別のスコアを返す
  const individualScore = () => {
    if (gameScore.length === 0) return "なし";
    return gameScore.map((v, i) => {
      return (
        <S.Table key={i} id={(i + 1).toString()}>
          <caption>
            {i + 1}回目：{" "}
            {JSON.stringify(v.paidMoney) ===
            JSON.stringify(calcAnswer(v.subtotal, v.myMoney)) ? (
              <S.CorrectAnswer>✅正解</S.CorrectAnswer>
            ) : (
              <S.CorrectAnswer>❌不正解</S.CorrectAnswer>
            )}
          </caption>
          <tbody>
            <tr>
              <td>会計</td>
              <td>{v.subtotal.toLocaleString()}円</td>
            </tr>
            <tr>
              <td>手持ち</td>
              <td>
                <Money money={v.myMoney} moneyType="score" />
              </td>
            </tr>
            <tr>
              <td>支払った金額</td>
              <td>
                <span>{calcMoneyTotal(v.paidMoney).toLocaleString()}円</span>
                （お釣り:
                <span>
                  {(calcMoneyTotal(v.paidMoney) - v.subtotal).toLocaleString()}
                  円
                </span>
                ）
              </td>
            </tr>
            <tr>
              <td>正解の支払い</td>
              <td>
                <span>
                  {calcMoneyTotal(
                    calcAnswer(v.subtotal, v.myMoney)
                  ).toLocaleString()}
                  円
                </span>
                （お釣り:
                <span>
                  {(
                    calcMoneyTotal(calcAnswer(v.subtotal, v.myMoney)) -
                    v.subtotal
                  ).toLocaleString()}
                  円
                </span>
                ）
              </td>
            </tr>
          </tbody>
        </S.Table>
      );
    });
  };

  //全体のスコアを返す
  const wholeScore = () => {
    return (
      <S.Table>
        <tbody>
          <tr>
            <td>支払い</td>
            <td>{gameScore.length + 1}回目</td>
          </tr>
          <tr>
            <td>正解数</td>
            <td>
              {gameScore.length}問中
              {calcNumberOfCorrectAnswers()}問正解
              {gameScore.length !== 0 && (
                <>
                  （正答率
                  {(Math.round(
                    (calcNumberOfCorrectAnswers() * 10000) / gameScore.length
                  ) *
                    100) /
                    10000}
                  % ）
                </>
              )}
            </td>
          </tr>
        </tbody>
      </S.Table>
    );
  };
  return (
    <>
      <S.ScoreTitle>📖ゲームの成績</S.ScoreTitle>
      <h3>全体</h3>
      {wholeScore()}
      <h3>個別</h3>
      {individualScore()}
    </>
  );
});
