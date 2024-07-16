import styled from "styled-components";
import iconBack from "/back-arrow-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const TopbarWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 64px 0 90px;
  justify-content: space-between;
  @media (max-width: 1024px) {
    padding: 54px 0 70px;
  }
  @media (max-width: 767px) {
    padding: 44px 0 50px;
  }
`;

const TopbarLeft = styled.div`
  display: flex;
  column-gap: 40px;
  align-items: center;
  @media (max-width: 1024px) {
    column-gap: 15px;
  }
`;

const TopbarBtn = styled.div`
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
    box-shadow: inset 4px -4px 2px rgba(0, 0, 0, 0.15),
      inset -4px -4px 2px rgba(0, 0, 0, 0.15);
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

const TopbarIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-top: -3px;
  color: ${({ theme }) => theme.white};
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
  background: url(${iconBack}) no-repeat center center/contain;
  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
  }
`;

const TopbarTitle = styled.div`
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
  }
`;

const Topbar = ({
  title,
  isBackBtnVisible,
}: {
  title: string;
  isBackBtnVisible?: boolean;
}) => {
  const navigate = useNavigate();
  const backToWelcome = () => {
    navigate("/");
  };

  return (
    <TopbarWrapper>
      <TopbarLeft>
        {isBackBtnVisible && (
          <TopbarBtn onClick={backToWelcome}>
            <TopbarIcon />
          </TopbarBtn>
        )}
        <TopbarTitle>{title}</TopbarTitle>
      </TopbarLeft>
    </TopbarWrapper>
  );
};

export default Topbar;
