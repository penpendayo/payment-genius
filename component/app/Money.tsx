import { TransitionGroup, CSSTransition } from "react-transition-group";

import * as S from "../styles/Money";
import type { MoneyType, Animation } from "../types/common";

type Props = {
  money: MoneyType;
  moneyType: string;
  moveMoney?: (addPayment: number) => void;
  animationConfig?: Animation;
  displayTopMoney?: number;
};

export default function Money({
  money,
  moneyType,
  moveMoney,
  animationConfig,
  displayTopMoney,
}: Props) {
  //お金の画像を表示
  const showMoneyImage = (price: number, coinCount: number) => {
    return (
      <TransitionGroup component={"div"}>
        {Array(coinCount)
          .fill(null)
          .map((_, i) => (
            <CSSTransition
              key={i}
              timeout={animationConfig === undefined ? 0 : animationConfig[1]}
              classNames={
                animationConfig === undefined ? "" : animationConfig[0]
              }
              appear={true}
            >
              <img src={`./image/${price}.png`} alt={`${price}円の画像`} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    );
  };
  //お金の枚数を表示
  const showMoneyCount = (coinCount: number) => {
    return (
      <S.MoneyCount isAnimation={moneyType === "my" ? true : false}>
        {coinCount !== 0 ? coinCount : ""}
      </S.MoneyCount>
    );
  };

  //お金をすべて表示
  const showMoneyAll = () => {
    return Object.keys(money).map((price, i) => {
      return (
        <S.MoneyImageAndCount
          key={i}
          isDisplayTopMoney={displayTopMoney === i + 1}
          onClick={() => {
            moveMoney !== undefined && moveMoney(Number(price));
          }}
        >
          {showMoneyImage(Number(price), money[price])}
          {showMoneyCount(money[price])}
        </S.MoneyImageAndCount>
      );
    });
  };

  return <S.MoneyBox moneyType={moneyType}>{showMoneyAll()}</S.MoneyBox>;
}
