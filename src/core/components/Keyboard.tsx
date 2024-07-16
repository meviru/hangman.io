import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const KeyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px 20px;
  margin-bottom: 100px;
  justify-content: center;
  @media (max-width: 1024px) {
    gap: 28px 25px;
  }
  @media (max-width: 767px) {
    gap: 20px 15px;
  }
`;

const Key = styled.button`
  position: relative;
  width: 102px;
  height: 74px;
  cursor: pointer;
  font-size: 55px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.darkText};
  text-align: center;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.white};
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
  @media (max-width: 1024px) {
    width: 82px;
    height: 62px;
    font-size: 45px;
  }
  @media (max-width: 767px) {
    width: 70px;
    height: 45px;
    font-size: 35px;
    border-radius: 15px;
  }
`;

const Keyboard = ({
  word,
  handleGuess,
  guessedLetters,
  incorrectGuesses,
  missingLetters,
}: {
  word: string;
  handleGuess: any;
  guessedLetters: string[];
  incorrectGuesses: string[];
  missingLetters: string[];
}) => {
  const keyboard = useMemo(
    () => [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
    ],
    []
  );
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  useEffect(() => {
    const letters = word
      .toLowerCase()
      .split("")
      .filter((letter) => !missingLetters.includes(letter));
    setUsedLetters(letters);
  }, [missingLetters]);

  return (
    <KeyWrapper>
      {keyboard.map((letter) => (
        <Key
          key={letter}
          onClick={() => handleGuess(letter.toLowerCase())}
          disabled={
            guessedLetters.includes(letter.toLowerCase()) ||
            incorrectGuesses.includes(letter.toLowerCase()) ||
            usedLetters.includes(letter.toLowerCase())
          }
        >
          {letter}
        </Key>
      ))}
    </KeyWrapper>
  );
};

export default Keyboard;
