import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  padding-top: 64px;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  column-gap: 40px;
  align-items: center;
`;

const HeaderToggleBtn = styled.div`
  display: flex;
  width: 95px;
  height: 95px;
  flex: 0 0 95px;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.gradientBg};
  box-shadow: inset 4px -10px 2px rgba(0, 0, 0, 0.15),
    inset -4px -10px 2px rgba(0, 0, 0, 0.15);
`;

const ToggleIcon = styled.div`
  position: relative;
  height: 7px;
  width: 38px;
  z-index: 2;
  display: block;
  background-color: ${({ theme }) => theme.white};
  &:before,
  &:after {
    position: absolute;
    content: "";
    height: 7px;
    width: 38px;
    background-color: inherit;
  }
  &:before {
    top: -13px;
  }
  &:after {
    bottom: -13px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 70px;
  font-weight: normal;
  filter: drop-shadow(3px 4px 0px ${({ theme }) => theme.darkBlue});
`;
const GameStatus = styled.div`
  display: flex;
  align-items: center;
`;
const ProgressWrapper = styled.div`
  display: flex;
  height: 32px;
  width: 242px;
  flex: 0 0 242px;
  padding: 0 12px;
  align-items: center;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.white};
`;

const ProgressBar = styled.div<{ width?: number }>`
  height: 12px;
  width: ${(props) => props.width}%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.darkText};
`;

const Heart = styled.div`
  margin: 5px 0 0 15px;
`;

const Header = ({ title, progress }: { title: string; progress: number }) => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <HeaderToggleBtn>
          <ToggleIcon />
        </HeaderToggleBtn>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderLeft>

      <GameStatus>
        <ProgressWrapper>
          <ProgressBar width={progress} />
        </ProgressWrapper>
        <Heart>
          <svg
            width="55px"
            height="55px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient gradientTransform="rotate(90)" id="gradient">
                <stop offset="40%" stopColor="#F573FE" />
                <stop offset="80%" stopColor="#897FFC" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            />
          </svg>
        </Heart>
      </GameStatus>
    </HeaderWrapper>
  );
};

export default Header;
