import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import FullBlog from "./components/fullBlog/FullBlog";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthContext } from "./context/authContext";
import HomePage from "./pages/HomePage/HomePage.jsx";


function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuthContext();
    if (!user) return <Navigate to="/loginPage" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/homePage" element={<ProtectedRoute> <HomePage /></ProtectedRoute>}/>
        <Route path="/blogs/:id" element={<ProtectedRoute><FullBlog /></ProtectedRoute>} />
        <Route path="/profilePage" element={<ProtectedRoute> <ProfilePage /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
