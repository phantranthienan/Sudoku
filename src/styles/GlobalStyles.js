import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --font-family: 'Popins', sans-serif;

        --bg-main: #f5f5f5;
        --text-color: #555555;
        --line-color: #595959;
        --info-value-color: #939393;
        --fixed-value-color: #3a3a3a;
        --editable-value-color: #1064cd;
        --error-value-color: #d73157;
        --cell-filled-color: #a8ccff;
        --blue-color: #0964cd;

        --nav-size: 70px;
        --cell-size: 35px;

        --space-y: 2rem;

        --title-size: 2.5rem;
        --number-size: 1.25rem;
        --info-size: 0.75rem;
        --icon-size: 1.75rem;
        --button-label-size: 1.5rem;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
    }

    body {
        font-family: var(--font-family);
        background-color: var(--bg-body);
        overflow-x: hidden;
        user-select: none;
    }

    button, input {
        font-family: inherit;
        border: none;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    
    @media (min-height: 900px) {
        :root {
            --cell-size: 40px;
            --number-size: 1.5rem;
            --info-size: 1rem;
        }
    }

    @media (min-height: 1000px) {
        :root {
            --cell-size: 50px;
            --icon-size: 2rem;
        }
    }

    @media (min-height: 1200px) {
        :root {
            --cell-size: 60px;
            --number-size: 2rem;
            --icon-size: 2.5rem;
        }
    }

    @media (max-height: 700px) {
        :root {
            --cell-size: 30px;
            --number-size: 1rem;
            --icon-size: 1.5rem;
        }
    }

    @media (max-width: 400px) {
        :root {
            --title-size: 2rem;
            --button-label-size: 1.25rem;
            --nav-size: 60px;
        }
    }
`;

export default GlobalStyles;
