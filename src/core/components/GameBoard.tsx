import styled from "styled-components";

const BoardWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    padding: 90px 0;
    justify-content: center;
`

const LetterTile = styled.div`
     position: relative;
     width: 108px;
     height: 124px;
     font-size: 100px;
     text-align: center;
     color: ${({ theme }) => theme.lightText};
     border-radius: 40px;
     text-transform: uppercase;
     text-shadow: 1px 1px 1px #444;
     background-color: ${({ theme }) => theme.primary};
     box-shadow: inset 4px 5px 2px rgba(255, 255, 255, 0.15), inset -4px 5px 2px rgba(255, 255, 255, 0.15), 0 0 2px 4px ${({ theme }) => theme.darkBlue};
     &.blank {
        opacity: 0.4;
     }
`

const LineBreak = styled.div`
    flex: 0 0 100%;
`

const GameBoard = ({ word, guessedLetters, missingLetters }: { word: any, guessedLetters: any, missingLetters: any }) => {

    const renderWord = () => {
        return word.split('').map((letter: string, index: number) =>
            letter === ' ' ? (
                <LineBreak key={index} />
            ) : guessedLetters.includes(letter.toLowerCase()) || !missingLetters.includes(letter.toLowerCase()) ? (
                <LetterTile key={index}>{letter}</LetterTile>
            ) : (
                <LetterTile key={index}> </LetterTile>
            )
        );
    };

    return <BoardWrapper>
        {renderWord()}
    </BoardWrapper >
}

export default GameBoard;