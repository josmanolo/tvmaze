import React from 'react';
import { ThemeProvider } from 'styled-components';
import Main from './components/Main';
import { GlobalStyle, theme } from './theme/globalStyles';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
