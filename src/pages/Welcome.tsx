import styled from "styled-components";
import siteLogo from "/logo.svg";
import iconPlay from "/play-alt-svgrepo-com.svg";

const WelcomeWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
  max-width: 300px;
  margin: -100px auto 0;
`;

const Logo = styled.img`
  display: block;
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
    background: url(${iconPlay}) no-repeat center center/contain;
  }

  &:active {
    top: 3px;
    box-shadow: inset 4px -6px 2px rgba(0, 0, 0, 0.15),
      inset -4px -6px 2px rgba(0, 0, 0, 0.3),
      inset 4px -6px 2px rgba(0, 0, 0, 0.3);
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
    box-shadow: inset 4px -5px 2px rgba(255, 255, 255, 0.15),
      inset -4px -5px 2px rgba(255, 255, 255, 0.15),
      0 0 2px 3px ${({ theme }) => theme.darkBlue};
  }
`;

const Welcome = () => {
  return (
    <WelcomeWrapper>
      <BoxWrapper>
        <LogoWrapper>
          <Logo
            src={siteLogo}
            alt="The Hangman Game"
            title="The Hangman Game"
          />
        </LogoWrapper>
        <PlayButton title="Play" />
        <HowToWrapper>
          <Button>How to play</Button>
        </HowToWrapper>
      </BoxWrapper>
    </WelcomeWrapper>
  );
};

export default Welcome;
