import styled from "styled-components";
import Topbar from "../shared/components/Topbar";
import { Container } from "../styles/GlobalStyles";
import { useEffect, useState } from "react";
import { ICategory } from "../models";
import getCategories from "../services/HangmanService";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "../shared/components/Skeleton";

const CategoryList = styled(motion.ul)`
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

const CategoryItem = styled(motion.li)`
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
  @media (max-width: 767px) {
    height: 70px;
    font-size: 30px;
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
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: i * 0.05,
    },
  }),
};

const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getCategories()
      .then((response) => {
        setCategories(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
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
        {isLoading && <Skeleton count={5} />}
        {!isLoading && (
          <CategoryList
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <AnimatePresence>
              {categories &&
                categories.length > 0 &&
                categories.map((category, i) => (
                  <CategoryItem
                    key={category.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    onClick={() => redirectToGame(category.id, category.name)}
                  >
                    {category.name}
                  </CategoryItem>
                ))}
            </AnimatePresence>
          </CategoryList>
        )}
      </Container>
    </>
  );
};

export default Category;
