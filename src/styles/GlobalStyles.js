import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
  }
  img {
    max-width: 100%;
  }
  a {
    color: inherit;
  }
`;

export default GlobalStyle;
