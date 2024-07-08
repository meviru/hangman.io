import styled from "styled-components";
import Topbar from "../shared/components/Topbar";
import { Container } from "../styles/GlobalStyles";

const CategoryList = styled.ul`
  display: grid;
  gap: 35px;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);
`;

const CategoryItem = styled.li`
  position: relative;
  display: flex;
  cursor: pointer;
  font-size: 42px;
  width: 100%;
  height: 150px;
  margin: 0 auto;
  padding: 20px;
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
`;

const Category = () => {
  return (
    <>
      <Container>
        <Topbar title="Pick a Category" isBackBtnVisible={true} />
        <CategoryList>
          <CategoryItem>Movies</CategoryItem>
          <CategoryItem>TV Shows</CategoryItem>
          <CategoryItem>Countries</CategoryItem>
          <CategoryItem>Capital Cities</CategoryItem>
        </CategoryList>
      </Container>
    </>
  );
};

export default Category;
