import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Category from "../pages/Category";
import GameLayout from "../pages/GameLayout";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:name" element={<GameLayout />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
