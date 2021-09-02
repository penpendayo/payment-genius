import type { NextPage } from "next";
import Head from "next/head";

import App from "./../component/app/App";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          支払いの天才 | 「財布の小銭を少なくする支払い方法」を鍛えられるゲーム
        </title>
      </Head>
      <App />
    </>
  );
};

export default Home;
