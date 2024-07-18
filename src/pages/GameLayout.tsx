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
  @media (max-width: 767px) {
    margin-top: -110px;
  }
`;

const ModalTitleText = styled.h2`
  font-size: 120px;
  font-weight: normal;
  background: linear-gradient(179.43deg, #83c0fb 40.1%, #e7f3ff 89.61%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(5px 7px 0px #153147);
  @media (max-width: 767px) {
    font-size: 80px;
  }
`;

const ModalSubtitle = styled.h3`
  margin: 15px 0 30px;
  font-size: 35px;
  font-weight: normal;
  @media (max-width: 767px) {
    font-size: 25px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    gap: 20px;
  }
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
  @media (max-width: 767px) {
    font-size: 28px;
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
  const [isCongratsModalOpen, setIsCongratsModalOpen] =
    useState<boolean>(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState<boolean>(false);

  const getRandomWord = useCallback((array: string[]) => {
    if (array.length === 0) {
      setIsCongratsModalOpen(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    const selectedWord = atob(array[randomIndex]);
    setWord(selectedWord);
    getMissingLetters(selectedWord);
  }, []);

  const getMissingLetters = useCallback((word: string) => {
    const wordLength = word.replace(/\s/g, "").length;

    let minHidden, maxHidden;
    if (wordLength >= 5) {
      minHidden = 4;
      maxHidden = Math.min(5, wordLength - 1);
    } else {
      minHidden = 3;
      maxHidden = Math.max(3, wordLength - 2);
    }

    const numHidden =
      Math.floor(Math.random() * (maxHidden - minHidden + 1)) + minHidden;

    const middleIndices = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== " ") {
        middleIndices.push(i);
      }
    }

    const shuffledIndices = middleIndices
      .sort(() => 0.5 - Math.random())
      .slice(0, numHidden);

    const missingLetters = word
      .split("")
      .filter((_, index: number) => shuffledIndices.includes(index));

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
      const wordsData = localStorage.getItem("words");
      const words = wordsData ? JSON.parse(wordsData) : [];

      const updatedWords = words.filter((w: string) => w !== word);
      localStorage.setItem("words", JSON.stringify(updatedWords));

      if (updatedWords.length === 0) {
        setIsCongratsModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
    }
  }, [isGameWon, isGameLost]);

  const onModalClose = useCallback(
    (isQuit: boolean = false) => {
      setIsModalOpen(false);
      setIsCongratsModalOpen(false);
      onContinue();
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
    setIsCongratsModalOpen(false);
    generateRandomWord();
  }, [generateRandomWord]);

  const onPause = () => {
    setIsPauseModalOpen(true);
  };

  const onPauseModalClose = () => {
    setIsPauseModalOpen(false);
  };

  return (
    <Container>
      <Header title={categoryTitle} progress={progress} onPause={onPause} />
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
      {(isGameWon || isGameLost) && (
        <>
          <Modal isOpen={isModalOpen} onClose={() => onModalClose(false)}>
            <ModalTitle>
              {isGameWon && <ModalTitleText>You win</ModalTitleText>}
              {isGameLost && <ModalTitleText>Game Over</ModalTitleText>}
              {isGameLost && (
                <ModalSubtitle>The word was "{word}".</ModalSubtitle>
              )}
            </ModalTitle>

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
          <Modal
            isOpen={isCongratsModalOpen}
            onClose={() => onModalClose(false)}
          >
            <ModalTitle>
              <ModalTitleText>Wohoooo!</ModalTitleText>
              <ModalSubtitle>You've guessed all the words!</ModalSubtitle>
            </ModalTitle>
            <ModalActions>
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
        </>
      )}

      {isPauseModalOpen && (
        <Modal isOpen={isPauseModalOpen} onClose={onPauseModalClose}>
          <ModalTitle>
            <ModalTitleText>Paused</ModalTitleText>
          </ModalTitle>
          <ModalActions>
            <ActionButton type="button" onClick={onPauseModalClose}>
              Resume
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
      )}
    </Container>
  );
};

export default GameLayout;
