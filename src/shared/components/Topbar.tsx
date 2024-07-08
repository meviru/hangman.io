import styled from "styled-components";
import iconBack from "/back-arrow-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

const TopbarWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 64px 0 90px;
  justify-content: space-between;
`;

const TopbarLeft = styled.div`
  display: flex;
  column-gap: 40px;
  align-items: center;
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
`;

const TopbarIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-top: -3px;
  color: ${({ theme }) => theme.white};
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
  background: url(${iconBack}) no-repeat center center/contain;
`;

const TopbarTitle = styled.div`
  font-size: 70px;
  font-weight: normal;
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
