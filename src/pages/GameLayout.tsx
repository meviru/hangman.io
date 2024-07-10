import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import Keyboard from "../core/components/Keyboard";
import GameBoard from "../core/components/GameBoard";
import Header from "../core/components/Header";
import Modal from "../shared/components/Modal";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
`;

const ModalTitle = styled.div`
  text-align: center;
  margin-top: -150px;
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
  display: flex;
  gap: 30px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
`;

const ActionButton = styled.button<{ color?: string }>`
  position: relative;
  display: flex;
  cursor: pointer;
  font-size: 32px;
  padding: 12px 50px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.lightText};
  border-radius: 35px;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px ${({ theme }) => theme.black};
  background: ${({ theme }) =>
    (props) =>
      props.color !== "secondary" ? theme.primary : theme.gradientBg};
  box-shadow: inset 4px 5px 2px rgba(255, 255, 255, 0.15),
    inset -4px 5px 2px rgba(255, 255, 255, 0.15),
    0 0 2px 3px ${({ theme }) => theme.darkBlue};
  &:active {
    top: 3px;
    box-shadow: inset 0px -3px 2px rgba(255, 255, 255, 0.15),
      inset -0px -3px 2px rgba(255, 255, 255, 0.15),
      0 0 2px 3px ${({ theme }) => theme.darkBlue};
  }
`;

const GameLayout = () => {
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [missingLetters, setMissingLetters] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);
  const maxGuesses = 8;

  const navigate = useNavigate();

  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isGameLost, setIsGameLost] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getRandomWord = useCallback((array: string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const selectedWord = array[randomIndex];
    setWord(selectedWord);
    getMissingLetters(selectedWord);
  }, []);

  const getMissingLetters = useCallback((word: string) => {
    const wordArray = word.split("");
    const wordLength = wordArray.length;
  
    // Ensure at least 2 characters remain visible and handle short words appropriately
    const minMissing = 2;
    const maxMissing = Math.min(5, wordLength - minMissing);
    const numMissingLetters = Math.floor(Math.random() * (maxMissing - minMissing + 1)) + minMissing;
  
    // Indices that can be missing (excluding first and last character)
    const middleIndices = wordArray
      .map((_, index) => index)
      .filter(index => index !== 0 && index !== wordLength - 1);
  
    // Shuffle the middleIndices array and take the first numMissingLetters elements
    const shuffledIndices = middleIndices.sort(() => 0.5 - Math.random()).slice(0, numMissingLetters);
  
    // Create the missing letters array
    const missingLetters = wordArray.map((char, index) => {
      if (shuffledIndices.includes(index)) {
        return " ";
      }
      return char;
    });
  
    setMissingLetters(missingLetters);
  }, []);
  

  const handleGuess = useCallback(
    (letter: string) => {
      setGuessedLetters((prev) => [...prev, letter]);
      if (!word.toLowerCase().includes(letter)) {
        setIncorrectGuesses((prev) => [...prev, letter]);
      }
    },
    [word]
  );

  const generateRandomWord = useCallback(() => {
    const wordsData = localStorage.getItem("words");
    const title = localStorage.getItem("categoryTitle");
    const words = wordsData ? JSON.parse(wordsData) : [];

    setCategoryTitle(title || "");
    getRandomWord(words);
  }, [getRandomWord]);

  useEffect(() => {
    generateRandomWord();
  }, [generateRandomWord]);

  useEffect(() => {
    const isGameWon = word.split("").every((letter) => {
      if (letter === " ") {
        return true;
      }
      return (
        guessedLetters.includes(letter.toLowerCase()) ||
        !missingLetters.includes(letter.toLowerCase())
      );
    });
    setIsGameWon(isGameWon);
    setIsGameLost(incorrectGuesses.length >= maxGuesses);
  }, [guessedLetters, missingLetters, incorrectGuesses]);

  useEffect(() => {
    setProgress(
      incorrectGuesses.length === 0
        ? 100
        : 100 - (incorrectGuesses.length / maxGuesses) * 100
    );
  }, [incorrectGuesses, maxGuesses]);

  useEffect(() => {
    if (isGameWon || isGameLost) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isGameWon, isGameLost]);

  const onModalClose = useCallback(
    (isQuit: boolean = false) => {
      setIsModalOpen(false);
      if (isQuit) {
        navigate("/");
      }
    },
    [navigate]
  );

  const redirectToCategory = useCallback(() => {
    navigate("/categories");
  }, [navigate]);

  const onContinue = useCallback(() => {
    setWord("");
    setProgress(100);
    setMissingLetters([]);
    setGuessedLetters([]);
    setIncorrectGuesses([]);
    setIsGameWon(false);
    setIsGameLost(false);
    setIsModalOpen(false);
    generateRandomWord();
  }, [generateRandomWord]);

  return (
    <Container>
      <Header title={categoryTitle} progress={progress} />
      <GameBoard
        word={word}
        guessedLetters={guessedLetters}
        missingLetters={missingLetters}
      />
      <Keyboard
        word={word}
        handleGuess={handleGuess}
        guessedLetters={guessedLetters}
        incorrectGuesses={incorrectGuesses}
        missingLetters={missingLetters}
      />
      <Modal isOpen={isModalOpen} onClose={() => onModalClose(false)}>
        {(isGameWon || isGameLost) && (
          <ModalTitle>
            {isGameWon && <ModalTitleText>You win</ModalTitleText>}
            {isGameLost && <ModalTitleText>Game Over</ModalTitleText>}
            {isGameLost && <span>The word was "{word}".</span>}
          </ModalTitle>
        )}
        <ModalActions>
          <ActionButton type="button" onClick={onContinue}>
            Continue
          </ActionButton>
          <ActionButton type="button" onClick={redirectToCategory}>
            New Category
          </ActionButton>
          <ActionButton
            type="button"
            color="secondary"
            onClick={() => onModalClose(true)}
          >
            Quit Game
          </ActionButton>
        </ModalActions>
      </Modal>
    </Container>
  );
};

export default GameLayout;
