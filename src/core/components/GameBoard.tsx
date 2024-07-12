import { motion } from "framer-motion";
import styled from "styled-components";

const BoardWrapper = styled.div`
  display: flex;
  gap: 10px 20px;
  flex-wrap: wrap;
  padding: 70px 0;
  min-height: 370px;
  align-items: center;
  justify-content: center;
`;

const LetterTile = styled.div`
  position: relative;
  width: 98px;
  height: 114px;
  font-size: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.lightText};
  border-radius: 35px;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.primary};
  box-shadow: inset 4px 5px 2px rgba(255, 255, 255, 0.15),
    inset -4px 5px 2px rgba(255, 255, 255, 0.15),
    0 0 2px 3px ${({ theme }) => theme.darkBlue};
  &.blank {
    opacity: 0.4;
  }
`;

const LineBreak = styled.div`
  flex: 0 0 100%;
`;

const itemVariants = {
  hidden: { scale: 1.4 },
  visible: { scale: 1 },
};

const GameBoard = ({
  word,
  guessedLetters,
  missingLetters,
}: {
  word: string;
  guessedLetters: string[];
  missingLetters: string[];
}) => {
  return (
    <BoardWrapper>
      {missingLetters.length > 0 &&
        word.split("").map((letter: string, index: number) =>
          letter === " " ? (
            <LineBreak key={index} />
          ) : guessedLetters.includes(letter.toLowerCase()) ||
            !missingLetters.includes(letter.toLowerCase()) ? (
            <LetterTile
              as={motion.div}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              key={index}
            >
              <motion.span
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                {letter}
              </motion.span>
            </LetterTile>
          ) : (
            <LetterTile key={index}> </LetterTile>
          )
        )}
    </BoardWrapper>
  );
};

export default GameBoard;
