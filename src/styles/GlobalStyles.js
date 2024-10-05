import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --font-family: 'Popins', sans-serif;

        --bg-main: ${({ theme }) => theme.background};
        --text-color: ${({ theme }) => theme.text};
        --line-color: ${({ theme }) => theme.line};
        --info-color: ${({ theme }) => theme.info};
        --fixed-color: ${({ theme }) => theme.fixed};
        --editable-color: ${({ theme }) => theme.editable};
        --error-color: ${({ theme }) => theme.error};
        --cell-color: ${({ theme }) => theme.cell};
        --cell-filled-color: ${({ theme }) => theme.filled};
        --nav-color: ${({ theme }) => theme.navbar};
        --pause-modal-bg: ${({ theme }) => theme.pauseModal};
        --subtext-color: ${({ theme }) => theme.subtext};

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
