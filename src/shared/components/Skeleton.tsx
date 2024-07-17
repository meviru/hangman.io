import styled from "styled-components";
import { SkeletonAnimation } from "../../styles/GlobalStyles";
import { AnimatePresence, motion } from "framer-motion";

const SkeletonWrapper = styled(motion.div)`
  display: grid;
  gap: 35px;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 540px) {
    gap: 25px;
    margin-bottom: 25px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SkeletonBlock = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 35px;
  box-shadow: inset 4px 5px 2px rgba(255, 255, 255, 0.15),
    inset -4px 5px 2px rgba(255, 255, 255, 0.15),
    0 0 2px 3px ${({ theme }) => theme.darkBlue};
  background-color: ${({ theme }) => theme.primary};
  &:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 35px;
    background-image: linear-gradient(
      to right,
      ${({ theme }) => theme.primary} 0%,
      rgba(255, 255, 255, 0.15) 20%,
      ${({ theme }) => theme.primary} 40%,
      ${({ theme }) => theme.primary} 100%
    );
    transform: rotate(30deg) scale(2);
    background-repeat: no-repeat;
    background-size: 450px 400px;
    background-color: ${({ theme }) => theme.primary};
    animation: ${SkeletonAnimation} 1s linear infinite;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
    },
  },
};

const Skeleton = ({ count }: any) => {
  return (
    <AnimatePresence>
      <SkeletonWrapper
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {Array(count)
          .fill(1)
          .map((skeleton: number, index: number) => (
            <SkeletonBlock
              key={index}
              id={`skeleton-${index + skeleton}`}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            ></SkeletonBlock>
          ))}
      </SkeletonWrapper>
    </AnimatePresence>
  );
};

export default Skeleton;
