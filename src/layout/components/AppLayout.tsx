import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../styles/GlobalStyles"
import { theme } from "../../styles/theme";
import { useState } from "react";
import Keyboard from "../../core/components/Keyboard";
import GameBoard from "../../core/components/GameBoard";

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    max-width: 1240px;

`

const AppLayout = () => {
    const word = 'United';
    const missingLetters = ['t', 'e'];
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


    return <>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Container>
                <GameBoard word={word} guessedLetters={guessedLetters} missingLetters={missingLetters} />
                <Keyboard keyboard={keyboard} handleGuess={handleGuess} guessedLetters={guessedLetters} incorrectGuesses={incorrectGuesses} />
                <div style={{ marginTop: "50px", textAlign: "center" }}>
                    <div>
                        Incorrect Guesses: {incorrectGuesses.join(', ')}
                    </div>
                    <div>
                        Remaining Guesses: {maxGuesses - incorrectGuesses.length}
                    </div>
                    {isGameWon && <span>Congratulations! You won!</span>}
                    {isGameLost && <span>Game Over! The word was "{word}".</span>}
                </div>
            </Container>
        </ThemeProvider>
    </>
}

export default AppLayout;