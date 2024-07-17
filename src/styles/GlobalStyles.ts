import styled, { createGlobalStyle, keyframes } from "styled-components";
import bgImage from "/mountains-starry-night.jpg";

export const GlobalStyles = createGlobalStyle`
    *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

img {
    border: none;
    max-width: 100%;
}

html,
body {
    font-family: "Mouse Memoirs", sans-serif;
    font-size: 20px;
    line-height: 1.2;
    font-weight: normal;
    min-height: 100vh;
    color: ${({ theme }) => theme.lightText};
    background: url("${bgImage}") no-repeat top center/cover;
}

body {
    position: relative;
    z-index: 2;
    &::after {  
        position: fixed;
        content: "";
        inset: 0;
        z-index: -1;
        opacity: 0.25;
        background-color: #000;
    }
}

ul, ol {
    list-style: none;
}
 
a {
    color: ${({ theme }) => theme.lightText};
}

input,
textarea,
button,
select {
    font-family: inherit;
    font-weight: 500;
    font-size: 16px;
    outline: none;
    border: none;
    color: ${({ theme }) => theme.lightText};
    &[disabled] {
        pointer-events: none;
        opacity: 0.5;
    }
}


::placeholder {
    color: #000;
}

::-webkit-input-placeholder {
    color: #000;
}

::-moz-placeholder {
    color: #000;
}

:-ms-input-placeholder {
    color: #000;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #282B30;
  border-radius: 5px;
}
 
::-webkit-scrollbar-thumb {
  background: #6C727F; 
  border-radius: 5px;
}
`;
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
`;

export const SkeletonAnimation = keyframes`
    0% {
        background-position: -450px 0;
    }
    100% {
        background-position: 450px 0;
    }
`;