import styled from "styled-components";
import siteLogo from "/logo.svg";
import iconPlay from "/play-alt-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomeWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: 30px;
  padding: 20px 20px 55px;
  background-color: rgba(38, 59, 116, 0.8);
  box-shadow: inset 4px -20px 2px rgba(0, 0, 0, 0.15),
    inset -4px -15px 2px rgba(0, 0, 0, 0.15),
    inset 4px -4px 2px ${({ theme }) => theme.darkBlue},
    inset -4px 4px 2px ${({ theme }) => theme.darkBlue},
    7px 7px 15px ${({ theme }) => theme.darkBlue};
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 176px;
  max-width: 300px;
  margin: -100px auto 0;
  @media (max-width: 767px) {
    max-width: 230px;
    height: 136px;
  }
`;

const Logo = styled.img`
  display: block;
  object-fit: contain;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
`;

const PlayButton = styled.div`
  position: relative;
  display: flex;
  width: 135px;
  height: 135px;
  flex: 0 0 135px;
  cursor: pointer;
  margin: 30px auto 50px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.gradientBg};
  box-shadow: inset 4px -10px 2px rgba(0, 0, 0, 0.15),
    inset -4px -10px 2px rgba(0, 0, 0, 0.3),
    inset 4px -10px 2px rgba(0, 0, 0, 0.3);

  &:before {
    position: absolute;
    content: "";
    width: 70px;
    height: 70px;
    inset: -3px 0 0 8px;
    margin: auto;
    transform: rotate(-4deg);
    filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
    background: url(${iconPlay}) no-repeat center center/contain;
  }

  &:active {
    top: 3px;
    box-shadow: inset 4px -6px 2px rgba(0, 0, 0, 0.15),
      inset -4px -6px 2px rgba(0, 0, 0, 0.3),
      inset 4px -6px 2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
    margin: 20px auto 30px;
    &:before {
      width: 45px;
      height: 45px;
      inset: -8px 0 0 8px;
    }
  }
`;

const HowToWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
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
  background-color: ${({ theme }) => theme.primary};
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
    font-size: 25px;
    padding: 12px 40px;
  }
`;

const variants = {
  hidden: { y: "200px", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

const Welcome = () => {
  const navigate = useNavigate();

  const redirectToCategories = () => {
    navigate("/categories");
  };

  return (
    <WelcomeWrapper>
      <BoxWrapper
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <LogoWrapper>
          <Logo
            src={siteLogo}
            alt="The Hangman Game"
            title="The Hangman Game"
          />
        </LogoWrapper>
        <PlayButton title="Play" onClick={redirectToCategories} />
        <HowToWrapper>
          <Button>How to play</Button>
        </HowToWrapper>
      </BoxWrapper>
    </WelcomeWrapper>
  );
};

export default Welcome;
