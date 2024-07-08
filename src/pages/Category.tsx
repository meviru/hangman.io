import styled from "styled-components";
import Topbar from "../shared/components/Topbar";
import { Container } from "../styles/GlobalStyles";
import { useEffect, useState } from "react";
import { ICategory } from "../models";
import getCategories from "../services/HangmanService";
import { useNavigate } from "react-router-dom";

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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const redirectToGame = (id: number, name: string) => {
    const selectedCategory = categories.find((category) => category.id === id);
    localStorage.setItem("words", JSON.stringify(selectedCategory?.words));
    localStorage.setItem("categoryTitle", name);
    const path = name.split(" ").join("-").toLowerCase();
    navigate(path);
  };

  return (
    <>
      <Container>
        <Topbar title="Pick a Category" isBackBtnVisible={true} />
        <CategoryList>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <CategoryItem
                key={category.id}
                onClick={() => redirectToGame(category.id, category.name)}
              >
                {category.name}
              </CategoryItem>
            ))}
        </CategoryList>
      </Container>
    </>
  );
};

export default Category;
