import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

export const theme = {
    font: {
        family: "Poppins, Arial, Helvetica, sans-serif",
    },

    color: {
        text: "rgb(21, 21, 21)",
        primaryBlue: "#00e4fd",
        primaryGray:'#333',
        blueGray: '#282e38',
        gray200: '#bdbdbd',
        yellow: '#f5c200',
    },

    boxShadow: 'box-shadow: 0px 0px 19px -8px rgb(0 0 0)',

    transition: "all .25s linear",
}

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body, html {
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.blueGray }
    }
    body {
        font-family: ${({ theme }) => theme.font.family };
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.color.text };
    }
`;