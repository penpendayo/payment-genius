import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import * as S from "../component/styles/Article";

const Rule: NextPage = () => {
  return (
    <>
      <Head>
        <title>ゲームのルール | 支払いの天才</title>
      </Head>
      <S.ArticleContainer>
        <h2>正解判定のアルゴリズム</h2>
        以下の2つの合計枚数が最小になる支払いを正解としています。
        <ul>
          <li>手持ちの硬貨</li>
          <li>手持ちのお札</li>
        </ul>
        <p>詳しくは以下のページをご覧ください。</p>
        <p>
          📚
          <Link href="/edu">
            <a>財布の小銭を最小限にする支払い方法</a>
          </Link>
        </p>
        <h2>手持ちの枚数上限</h2>
        それぞれ以下のように設定しています。
        <ul>
          <li>1円：4枚</li>
          <li>5円：1枚</li>
          <li>10円：4枚</li>
          <li>50円：1枚</li>
          <li>100円：4枚</li>
          <li>1000円：4枚</li>
        </ul>
        <p style={{ marginTop: "50px" }}>
          このように上限を設定した理由は以下の3つです。
        </p>
        <ul>
          <li>普通に支払っていれば、上限を超えることはないから</li>
          <li>上限をなくすとデザインが崩れるから</li>
          <li>上限をなくすと正解判定を出すのが難しくなるから</li>
        </ul>
      </S.ArticleContainer>
    </>
  );
};

export default Rule;
