import styled from "styled-components";
import { useEffect, useState } from "react";
import Keyboard from "../core/components/Keyboard";
import GameBoard from "../core/components/GameBoard";
import Header from "../core/components/Header";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
`;

const GameLayout = () => {
  const [categoryTitle, setCategoryTitle] = useState<string | any>("");
  const [word, setWord] = useState<string>("");
  const [missingLetters, setMissingLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);
  const maxGuesses = 8;

  const [keyboard] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ]);

  const getRandomWord = (array: string[]): string => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const getMissingLetters = (word: string) => {
    const wordArray = word.replace(/\s/g, "").split("");
    const uniqueLetters = [...new Set(wordArray)];
    const minMissing = 2;
    const maxMissing = Math.min(4, uniqueLetters.length);
    const numMissingChars =
      Math.floor(Math.random() * (maxMissing - minMissing + 1)) + minMissing;
    const missingChars: any = [];

    while (missingChars.length < numMissingChars) {
      const randomIndex = Math.floor(Math.random() * uniqueLetters.length);
      const letter = uniqueLetters[randomIndex];

      if (!missingChars.includes(letter)) {
        missingChars.push(letter);
      }
    }

    setMissingLetters(missingChars);
  };

  const handleGuess = (letter: string) => {
    if (word.toLowerCase().includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setIncorrectGuesses([...incorrectGuesses, letter]);
    }
  };

  useEffect(() => {
    const wordsData: any = localStorage.getItem("words");
    const title = localStorage.getItem("categoryTitle");
    const words = JSON.parse(wordsData);

    setCategoryTitle(title);
    setWord(getRandomWord(words));
  }, []);

  useEffect(() => {
    getMissingLetters(word);
  }, [word]);

  const isGameWon = word
    .split("")
    .every(
      (letter) =>
        guessedLetters.includes(letter.toLowerCase()) ||
        !missingLetters.includes(letter.toLowerCase())
    );
  const isGameLost = incorrectGuesses.length >= maxGuesses;
  const progress =
    incorrectGuesses.length === 0
      ? 0
      : (incorrectGuesses.length / maxGuesses) * 100;

  return (
    <>
      <Container>
        <Header title={categoryTitle} progress={progress} />
        <GameBoard
          word={word}
          guessedLetters={guessedLetters}
          missingLetters={missingLetters}
        />
        <Keyboard
          keyboard={keyboard}
          handleGuess={handleGuess}
          guessedLetters={guessedLetters}
          incorrectGuesses={incorrectGuesses}
        />
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          {isGameWon && <span>Congratulations! You won!</span>}
          {isGameLost && <span>Game Over! The word was "{word}".</span>}
        </div>
      </Container>
    </>
  );
};

export default GameLayout;
