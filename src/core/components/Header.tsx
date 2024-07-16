import { useEffect, useState } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  padding-top: 64px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1024px) {
    padding-top: 54px;
  }
  @media (max-width: 767px) {
    padding-top: 44px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  column-gap: 40px;
  align-items: center;
  @media (max-width: 1024px) {
    column-gap: 15px;
  }
`;

const HeaderToggleBtn = styled.div`
  position: relative;
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
  &:active {
    top: 3px;
    box-shadow: inset 4px -5px 2px rgba(0, 0, 0, 0.15),
      inset -4px -5px 2px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 1024px) {
    width: 85px;
    height: 85px;
    flex: 0 0 85px;
  }
  @media (max-width: 767px) {
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
  }
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
    width: inherit;
    height: inherit;
    background-color: inherit;
  }
  &:before {
    top: -13px;
  }
  &:after {
    bottom: -13px;
  }
  @media (max-width: 767px) {
    width: 25px;
    height: 4px;
    &:before {
      top: -8px;
    }
    &:after {
      bottom: -8px;
    }
  }
`;

const HeaderTitle = styled.h2`
  font-size: 70px;
  font-weight: normal;
  background: linear-gradient(179.43deg, #83c0fb 40.1%, #e7f3ff 89.61%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(5px 7px 0px #153147);
  @media (max-width: 1024px) {
    font-size: 60px;
  }
  @media (max-width: 767px) {
    font-size: 40px;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
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
  @media (max-width: 1024px) {
    height: 28px;
    width: 200px;
    flex: 0 0 200px;
  }
  @media (max-width: 767px) {
    width: 80px;
    flex: 0 0 80px;
  }
`;

const ProgressBar = styled.div<{ width?: number }>`
  height: 12px;
  width: ${(props) => props.width}%;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.darkText};
  transition: 0.35s ease width;
`;

const Heart = styled.div`
  margin: 5px 0 0 15px;
  svg {
    @media (max-width: 767px) {
      width: 40px;
    }
  }
`;

const MaskRect = styled.rect<{ height: number }>`
  transition: height 0.45s ease;
`;

const Header = ({
  title,
  progress,
  onPause,
}: {
  title: string;
  progress: number;
  onPause: any;
}) => {
  const [maskHeight, setMaskHeight] = useState(0);

  useEffect(() => {
    const calculatedMaskHeight = (progress / 100) * 20;
    setMaskHeight(calculatedMaskHeight);
  }, [progress]);

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <HeaderToggleBtn onClick={onPause}>
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
              <mask id="mask">
                <rect x="0" y="0" width="24" height="24" fill="white" />
                <MaskRect
                  id="mask-rect"
                  x="0"
                  y="0"
                  width="24"
                  height={20 - maskHeight}
                  fill="black"
                />
              </mask>
            </defs>
            <path
              fill="white"
              d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            />
            <path
              fill="url(#gradient)"
              mask="url(#mask)"
              d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            />
          </svg>
        </Heart>
      </GameStatus>
    </HeaderWrapper>
  );
};

export default Header;
