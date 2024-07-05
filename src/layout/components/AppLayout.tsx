import styled from "styled-components";
import { useState } from "react";
import Keyboard from "../../core/components/Keyboard";
import GameBoard from "../../core/components/GameBoard";
import Header from "../../core/components/Header";

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    max-width: 1240px;

`

const AppLayout = () => {
    const word = 'United America';
    const missingLetters = ['n', 'a', 'd'];

    const [guessedLetters, setGuessedLetters] = useState<any>([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState<any>([]);
    const maxGuesses = 8;

    const [keyboard] = useState([
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]);

    const handleGuess = (letter: string) => {
        if (word.toLowerCase().includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else {
            setIncorrectGuesses([...incorrectGuesses, letter]);
        }
    };

    const isGameWon = word.split('').every((letter) => guessedLetters.includes(letter.toLowerCase()) || !missingLetters.includes(letter.toLowerCase()));
    const isGameLost = incorrectGuesses.length >= maxGuesses;
    const progress = incorrectGuesses.length === 0 ? 0 : (incorrectGuesses.length / maxGuesses) * 100;

    return <>
        <Container>
            <Header progress={progress} />
            <GameBoard word={word} guessedLetters={guessedLetters} missingLetters={missingLetters} />
            <Keyboard keyboard={keyboard} handleGuess={handleGuess} guessedLetters={guessedLetters} incorrectGuesses={incorrectGuesses} />
            <div style={{ marginTop: "50px", textAlign: "center" }}>
                {isGameWon && <span>Congratulations! You won!</span>}
                {isGameLost && <span>Game Over! The word was "{word}".</span>}
            </div>
        </Container>
    </>
}

export default AppLayout;