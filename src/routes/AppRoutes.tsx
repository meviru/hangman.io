import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Category from "../pages/Category";

const AppRoutes = () => {
    return <>
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/categories" element={<Category />} />
            </Routes>
        </Router>
    </>
}

export default AppRoutes;