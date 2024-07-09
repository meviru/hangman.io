import styled from "styled-components";
import { useEffect, useState } from "react";
import Keyboard from "../core/components/Keyboard";
import GameBoard from "../core/components/GameBoard";
import Header from "../core/components/Header";
import Modal from "../shared/components/Modal";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
`;

const ModalTitle = styled.div`
  text-align: center;
  margin-top: -100px;
`;

const ModalTitleText = styled.h2`
  font-size: 120px;
  font-weight: normal;
  background: linear-gradient(179.43deg, #83c0fb 40.1%, #e7f3ff 89.61%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(5px 7px 0px #153147);
`;

const ModalActions = styled.div`
`

const GameLayout = () => {
  const [categoryTitle, setCategoryTitle] = useState<string | any>("");
  const [word, setWord] = useState<string>("");
  const [missingLetters, setMissingLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);
  const maxGuesses = 8;

  const [keyboard] = useState([
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
  ]);

  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isGameLost, setIsGameLost] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getRandomWord = (array: string[]): string => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const getMissingLetters = (word: string) => {
    const wordArray = word.replace(/\s/g, "").split("");
    const minMissing = 2;
    const maxMissing = Math.min(5, wordArray.length - 2);
    const numMissingLetters =
      Math.floor(Math.random() * (maxMissing - minMissing + 1)) + minMissing;
    const middleCharacters = wordArray.slice(1, -1);
    const missingLetters: any = [];

    while (missingLetters.length < numMissingLetters) {
      const randomIndex = Math.floor(Math.random() * middleCharacters.length);
      const letter = middleCharacters[randomIndex];

      if (!missingLetters.includes(letter)) {
        missingLetters.push(letter);
      }
    }

    setMissingLetters(missingLetters);
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

    return () => {
      setWord("");
    };
  }, []);

  useEffect(() => {
    getMissingLetters(word);
  }, [word]);

  useEffect(() => {
    const isGameWon = word
      .split("")
      .every(
        (letter) =>
          guessedLetters.includes(letter.toLowerCase()) ||
          !missingLetters.includes(letter.toLowerCase())
      );
    setIsGameWon(isGameWon);
  }, [guessedLetters, missingLetters]);

  useEffect(() => {
    setIsGameLost(incorrectGuesses.length >= maxGuesses);
    setProgress(
      incorrectGuesses.length === 0
        ? 100
        : 100 - (incorrectGuesses.length / maxGuesses) * 100
    );
  }, [incorrectGuesses]);

  useEffect(() => {
    if (isGameWon) {
      setIsModalOpen(true);
    }
    if (isGameLost) {
      setIsModalOpen(false);
    }
  }, [isGameWon, isGameLost]);

  const onModalClose = () => {
    setIsModalOpen(false);
  };

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
          word={word}
          keyboard={keyboard}
          handleGuess={handleGuess}
          guessedLetters={guessedLetters}
          incorrectGuesses={incorrectGuesses}
          missingLetters={missingLetters}
        />
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalTitle>
            {isGameWon && <ModalTitleText>You win</ModalTitleText>}
            {isGameLost && <ModalTitleText>Game Over!</ModalTitleText>}
            {isGameLost && <span>The word was "{word}".</span>}
          </ModalTitle>
          <ModalActions></ModalActions>
        </Modal>
      </Container>
    </>
  );
};

export default GameLayout;
