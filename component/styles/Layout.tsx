import styled, { createGlobalStyle } from "styled-components";

import { media } from "../utils/mediaQuery";
import { normalize } from "styled-normalize";
import * as color from "../utils/color";

/* ----------------------------------------Over--------------------------------------- */
export const GlobalStyle = createGlobalStyle`
${normalize}
html {
  font-size: 62.5%;
}
body {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: ${color.white};
  color: ${color.darkGray};
  line-height:1.8;
  font-size: 1.7rem;
  margin: 0 auto;
  min-height: 100vh;
  a{
    color:${color.darkGray};
  }
}

`;

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template:
    "header"
    "......" 30px
    "main  " 1fr
    "......" 50px
    "footer";
`;
/* ----------------------------------------Main--------------------------------------- */
export const Main = styled.main`
  grid-area: main;
`;

/* ----------------------------------------Header--------------------------------------- */
export const Header = styled.header`
  background-color: ${color.green};
  grid-area: header;
  color: ${color.white};
  text-align: center;
  position: relative;
`;
export const SiteTitle = styled.h1`
  text-align: center;
  letter-spacing: 1px;
  margin: 10px 0;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const SiteDescription = styled.div`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;
/* ----------------------------------------Footer---------------------------------------- */
export const Footer = styled.footer`
  a {
    color: ${color.white};
  }
  ul {
    list-style-type: none;
    padding-left: 2rem;
  }
  address {
    display: inline;
    font-style: normal;
  }

  & > div {
    gap: 10px;
    margin: 0 auto;
    width: 860px;
    display: flex;
    /* gap: 30px; */
    & > div {
      flex-basis: 33.33%;
    }
    ${media.phone`
      gap: 0px;
      padding-left: 0px;
      width:100%;
      flex-direction:column;

  `}
  }
  padding: 20px;
  grid-area: footer;
  color: ${color.white};
  background-color: ${color.green};
`;
