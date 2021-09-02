import React, { ReactNode } from "react";
import Link from "next/link";

import * as S from "../styles/Layout";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <S.Header>
          <S.SiteTitle>
            <Link href="/">
              <a>💴支払いの天才💴</a>
            </Link>
          </S.SiteTitle>
          <S.SiteDescription>
            「財布の小銭を少なくする支払い方法」を鍛えられるゲーム
          </S.SiteDescription>
        </S.Header>
        <S.Main>{children}</S.Main>
        <S.Footer>
          <div>
            <div>
              <h3>サイトコンテンツ</h3>
              <ul>
                <li>
                  🔰
                  <Link href="rule">
                    <a> ゲームのルール</a>
                  </Link>
                </li>
                <li>
                  📚
                  <Link href="edu">
                    <a>小銭を最小限にする支払い方法</a>
                  </Link>
                </li>
                <li>
                  🔥
                  <Link href="question">
                    <a>激ムズ問題に挑戦</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>サイトの使用技術など</h3>
              <ul>
                <li>
                  ✨
                  <a href="https://penpen-dev.com/blog/payment-genius/">
                    サイトの技術紹介
                  </a>
                </li>
                <li>
                  <img src="./image/githubicon.svg" alt="" />
                  <a href="https://github.com/penpendayo/payment-genius/">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>連絡先</h3>
              <ul>
                <li>
                  <img src="./image/twittericon.svg" alt="" />
                  <address>
                    <a href="https://twitter.com/penpen_dev">Twitter</a>
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </S.Footer>
      </S.Container>
    </>
  );
}
