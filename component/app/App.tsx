/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Money from "./Money";
import Score from "./Score";
import * as S from "../styles/App";
import { audio } from "../utils/soundEffect";
import type { MoneyType, Animation, GameScore } from "../types/common";
import { addUrlPrefix } from "../utils/addUrlPrefix";

const ANIMATION_CLASSNAME: {
  PAY_RETURN: Animation;
  REFILL: Animation;
  FILLUP_PUSH_PULL: Animation;
} = {
  PAY_RETURN: [
    { enterDone: "payreturn-enter-done", exit: "payreturn-exit" },
    {
      appear: 0,
      enter: 0,
      exit: 5000,
    },
  ],
  REFILL: [{ enterDone: "refill-enter-done" }, 0],
  FILLUP_PUSH_PULL: [
    { appearDone: "fillup-appear-done", enterDone: "pushpull-enter-done" },
    0,
  ],
};
const SUBTOTAL_MIN = 101;
const SUBTOTAL_MAX = 3999;
const INITIAL = Math.floor(
  Math.random() * (SUBTOTAL_MAX + 1 - SUBTOTAL_MIN) + SUBTOTAL_MIN
);

//moneyオブジェクトの値の合計を返す
const calcMoneyTotal = (money: MoneyType) =>
  Object.entries(money).reduce(
    (acc, current) => acc + Number(current[0]) * current[1],
    0
  );

//手持ちと小計を渡して、正解の支払いを返す
const calcAnswer = (subtotal: number, myMoney: MoneyType): MoneyType => {
  let answer: MoneyType = {
    "1": 0,
    "5": 0,
    "10": 0,
    "50": 0,
    "100": 0,
    "500": 0,
    "1000": 0,
  };
  let carryupFlg = false; //trueなら1桁繰り上げ
  String(("000" + subtotal).slice(-4)) //どんな小計も0詰めの4桁にする
    .split("")
    .map(Number)
    .reverse()
    .forEach((v, i) => {
      if (carryupFlg) {
        if (v !== 9) {
          v++;
          carryupFlg = false;
        } else return;
      }
      //0円
      if (v === 0) return;
      //5円
      if (v === 5) {
        //2桁目以降
        if (i > 0) {
          //50円を5円10枚で（無意味な処理）
          if (myMoney[5 * 10 ** (i - 1)] >= 10) {
            answer[5 * 10 ** (i - 1)] += 10;
            return;
          }
        }
        if (myMoney[1 * 10 ** i] >= 5) {
          answer[1 * 10 ** i] += 5;
          return;
        }
        if (myMoney[5 * 10 ** i] >= 1) {
          answer[5 * 10 ** i] += 1;
          return;
        }
        carryupFlg = true;
        return;
      }
      //1～4円
      if (v < 5) {
        if (i > 0) {
          if (myMoney[1 * 10 ** (i - 1)] >= v * 10) {
            //10円を1円10枚（無意味な処理）
            answer[1 * 10 ** (i - 1)] += v * 10;
            return;
          }
        }
        if (myMoney[1 * 10 ** i] >= v) {
          answer[1 * 10 ** i] += v;
          return;
        }
        //1～4円を1円で払えない場合はさらに「5円があるか」をチェックして、ある場合は5円を出
        if (myMoney[5 * 10 ** i] * 5 >= v) {
          answer[5 * 10 ** i] += 1;
          return;
        }
        carryupFlg = true;
        return;
      }

      //6~9円
      if (v > 5) {
        if (myMoney[1 * 10 ** i] >= v % 5) {
          answer[1 * 10 ** i] += v % 5;
          carryupFlg = true;
          if (myMoney[1 * 10 ** i] >= 5) {
            answer[1 * 10 ** i] += 5;
            carryupFlg = false;
            return;
          }
          if (myMoney[5 * 10 ** i] >= 1) {
            answer[5 * 10 ** i] += 1;
            carryupFlg = false;
            return;
          }
          return;
        }
      }
      //どれも出せなかった場合は次の桁へ繰越し
      carryupFlg = true;
      return;
    });
  return answer;
};
//お金に対応するimgの順番を返す
const moneyOrder = (price: number): number => {
  switch (price) {
    case 1:
      return 1;
    case 5:
      return 2;
    case 10:
      return 3;
    case 50:
      return 4;
    case 100:
      return 5;
    case 500:
      return 6;
    case 1000:
      return 7;
    default:
      throw new Error("moneyOrderでエラー");
  }
};

export default function App() {
  const [subtotal, setSubtotal] = useState(INITIAL);

  //クリックされたお金のz-indexを高くするためのフラグ　第1：myかpaidか、第2：硬貨の種類
  const [displayTopMoney, setDisplayTopMoney] = useState<[string, number]>([
    "",
    0,
  ]);
  const [paidMoney, setPaidMoney] = useState<MoneyType>({
    1: 0,
    5: 0,
    10: 0,
    50: 0,
    100: 0,
    500: 0,
    1000: 0,
  });
  const [allowPay, setAllowPay] = useState(false);
  const [change, setChange] = useState(0);
  const [myMoney, setMymoney] = useState<MoneyType>({
    1: 4,
    5: 1,
    10: 4,
    50: 1,
    100: 4,
    500: 1,
    1000: 4,
  });
  const [gameScore, setGameScore] = useState<GameScore[]>([]);
  const [animationConfig, setAnimationConfig] = useState<Animation>(
    ANIMATION_CLASSNAME.FILLUP_PUSH_PULL
  );

  // お金を出し入れするたびに支払い可能かをチェック
  useEffect(() => {
    calcMoneyTotal(paidMoney) >= subtotal
      ? setAllowPay(true)
      : setAllowPay(false);
  }, [paidMoney]);

  //アニメーション基準で処理を進める
  useEffect(() => {
    switch (animationConfig) {
      case ANIMATION_CLASSNAME.FILLUP_PUSH_PULL:
        break;
      case ANIMATION_CLASSNAME.PAY_RETURN:
        addGameScore();
        setSubtotal(Infinity);
        payMoney();
        setTimeout(() => {
          setAnimationConfig(ANIMATION_CLASSNAME.REFILL);
        }, 2000);
        break;
      case ANIMATION_CLASSNAME.REFILL:
        //1000円札の補充
        if (myMoney["1000"] < 4) {
          setMymoney((prevMyMoney) => {
            return { ...prevMyMoney, 1000: 4 };
          });
        }
        setTimeout(nextStage, 1000);
        break;
      default:
        break;
    }
  }, [animationConfig]);

  //お釣りができたらお釣りを返す処理を実行する
  useEffect(() => {
    setTimeout(() => {
      returnChange();
    }, 1000);
  }, [change]);

  //お金を手持ち → レジ皿へ
  const pushMoney = (addPayment: number) => {
    if (subtotal === Infinity) return;
    if (myMoney[addPayment] === 0) return;
    setDisplayTopMoney(["paid", moneyOrder(addPayment)]);
    setPaidMoney((prevPaidMoney) => {
      const tmp = { ...prevPaidMoney };
      tmp[addPayment]++;
      return { ...tmp };
    });
    setMymoney((prevMyMoney) => {
      const tmp = { ...prevMyMoney };
      tmp[addPayment]--;
      return { ...tmp };
    });
  };
  //お金をレジ皿 → 手持ちへ
  const pullMoney = (addPayment: number) => {
    if (subtotal === Infinity) return;
    if (paidMoney[addPayment] === 0) return;
    setDisplayTopMoney(["my", moneyOrder(addPayment)]);
    setMymoney((prevMyMoney) => {
      const tmp = { ...prevMyMoney };
      tmp[addPayment]++;
      return { ...tmp };
    });
    setPaidMoney((prevPaidMoney) => {
      const tmp = { ...prevPaidMoney };
      tmp[addPayment]--;
      return { ...tmp };
    });
  };
  //お釣りを返す
  const returnChange = () => {
    let changeCopy = change;
    if (changeCopy > 0) {
      let myMoneyCopy: MoneyType = { ...myMoney };
      const commonFunction = (price: number) => {
        myMoneyCopy[price] += Math.floor(changeCopy / price);
        changeCopy -= Math.floor(changeCopy / price) * price;
        //手持ち上限を超えていた場合、上限数にリセット
        switch (price) {
          case 1:
          case 10:
          case 100:
          case 1000:
            if (myMoneyCopy[price] > 4) myMoneyCopy[price] = 4;
            break;
          case 5:
          case 50:
          case 500:
            if (myMoneyCopy[price] > 1) myMoneyCopy[price] = 1;
            break;
          default:
            break;
        }
      };
      if (changeCopy / 1000 >= 1) commonFunction(1000);
      if (changeCopy / 500 >= 1) commonFunction(500);
      if (changeCopy / 100 >= 1) commonFunction(100);
      if (changeCopy / 50 >= 1) commonFunction(50);
      if (changeCopy / 10 >= 1) commonFunction(10);
      if (changeCopy / 5 >= 1) commonFunction(5);
      if (changeCopy / 1 >= 1) commonFunction(1);
      setMymoney(myMoneyCopy);
      setTimeout(() => {
        setChange(0);
      }, 1000);
    }
  };
  //支払うボタンが押されたら
  const payButtonPush = () => {
    audio.openRegister.play();
    setAnimationConfig(ANIMATION_CLASSNAME.PAY_RETURN);
  };

  //お金を払ってお釣りを計算
  const payMoney = () => {
    setPaidMoney((prev) => {
      const change = calcMoneyTotal(prev) - subtotal;
      setChange(change);
      return {
        1: 0,
        5: 0,
        10: 0,
        50: 0,
        100: 0,
        500: 0,
        1000: 0,
      };
    });
  };

  //履歴に追加
  const addGameScore = () => {
    const tmp = [...gameScore];
    const gameScoreTmp: GameScore = {
      subtotal,
      myMoney: ((myMoney: MoneyType, paidMoney: MoneyType) => {
        return Object.keys(myMoney).reduce(
          (acc, v) => {
            acc[v] = myMoney[v] + paidMoney[v];
            return acc;
          },
          {
            "1": 0,
            "5": 0,
            "10": 0,
            "50": 0,
            "100": 0,
            "500": 0,
            "1000": 0,
          } as MoneyType
        );
      })(myMoney, paidMoney), //即時関数(「支払い後の手持ち」と「支払った金額」の合計が「最初の手持ち」)
      paidMoney,
    };
    tmp.push(gameScoreTmp);
    setGameScore(tmp);
  };

  //次の問題へ
  const nextStage = () => {
    setAnimationConfig(ANIMATION_CLASSNAME.FILLUP_PUSH_PULL);
    setSubtotal(
      Math.floor(
        Math.random() * (SUBTOTAL_MAX + 1 - SUBTOTAL_MIN) + SUBTOTAL_MIN
      )
    );
  };

  //正解、不正解を表示する
  const showAnswerResult = () => {
    return (
      subtotal === Infinity && (
        <S.Answer>
          {JSON.stringify(gameScore[gameScore.length - 1].paidMoney) ===
          JSON.stringify(
            calcAnswer(
              gameScore[gameScore.length - 1].subtotal,
              gameScore[gameScore.length - 1].myMoney
            )
          ) ? (
            <S.CorrectAnswer></S.CorrectAnswer>
          ) : (
            <a href={`#${gameScore.length}`}>
              <S.IncorrectAnswer>⇒正解を見る</S.IncorrectAnswer>
            </a>
          )}
        </S.Answer>
      )
    );
  };

  return (
    <>
      <S.GridContainer>
        <S.Accounting>
          {subtotal !== Infinity ? (
            <div>
              <S.Subtotal animationTime={gameScore.length > 0 ? 0.6 : 2.5}>
                {subtotal.toLocaleString()}円
              </S.Subtotal>
            </div>
          ) : (
            <div>会計中...</div>
          )}
          <img
            src={addUrlPrefix("/image/rezi.svg")}
            alt={`レジ`}
            draggable="false"
          />
        </S.Accounting>
        <Money
          money={paidMoney}
          moneyType="paid"
          moveMoney={pullMoney}
          animationConfig={animationConfig}
          displayTopMoney={
            displayTopMoney[0] === "paid" ? displayTopMoney[1] : 0
          }
        />
        <S.Wallet>
          <img
            src={addUrlPrefix("/image/wallet.svg")}
            alt={`がま口の財布`}
            draggable="false"
          />
        </S.Wallet>
        <S.Paid>{calcMoneyTotal(paidMoney).toLocaleString()}円</S.Paid>
        {showAnswerResult()}
        <S.Pay>
          <S.PayBtn onClick={payButtonPush} disabled={!allowPay}>
            支払う
          </S.PayBtn>
        </S.Pay>
        <Money
          money={myMoney}
          moneyType="my"
          moveMoney={pushMoney}
          animationConfig={animationConfig}
          displayTopMoney={displayTopMoney[0] === "my" ? displayTopMoney[1] : 0}
        />
        {change !== 0 && <S.Change>{change.toLocaleString()}円</S.Change>}
        <S.Score>
          <Score
            gameScore={gameScore}
            calcMoneyTotal={calcMoneyTotal}
            calcAnswer={calcAnswer}
          />
        </S.Score>
      </S.GridContainer>
    </>
  );
}
