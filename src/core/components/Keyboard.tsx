import styled from "styled-components";

const KeyWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

const Key = styled.button`
    position: relative;
    width: 114px;
    height: 84px;
    cursor: pointer;
    font-size: 60px;
    color: ${({ theme }) => theme.darkText};
    text-align: center;
    border-radius: 25px;
    background-color: #fff;
    &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: 8px;
        left: 0;
        z-index: -1;
        border-radius: inherit;
        background-color: #ededed;
    }
    &:active {
        top: 3px;
        &:after {
            top: 3px;
        }
    }
`

const Keyboard = ({ keyboard, handleGuess, guessedLetters, incorrectGuesses }: { keyboard: string[], handleGuess: any, guessedLetters: any, incorrectGuesses: any }) => {
    return <KeyWrapper>
        {keyboard.map((letter) => (
            <Key key={letter} onClick={() => handleGuess(letter)} disabled={guessedLetters.includes(letter) || incorrectGuesses.includes(letter)}>
                {letter}
            </Key>
        ))}
    </KeyWrapper>
}

export default Keyboard;