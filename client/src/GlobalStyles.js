import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  html, body, div, span, applet, object, iframe,
   h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      scroll-behavior: smooth;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
      font-family: 'Brandon Grotesque Black', sans-serif;
      background-color: #f7f7f7 ;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  } 
`;

// font-family: 'Brandon Grotesque Regular', sans-serif;
// font-family: 'Brandon Grotesque Thin', sans-serif;
// font-family: 'Brandon Grotesque Light', sans-serif;
// font-family: 'Brandon Grotesque Medium', sans-serif;
// font-family: 'Brandon Grotesque Bold', sans-serif;
// font-family: 'Brandon Grotesque Black', sans-serif;
