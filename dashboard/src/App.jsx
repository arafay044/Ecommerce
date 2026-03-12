import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard"
import Orders from "./components/Orders"
import Products from "./components/Products"
import Profile from "./components/Profile"
import Users from "./components/Users"
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";

function App() {

  const { openedComponent } = useSelector(state => state.extra);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const  renderDashboardContent = () => {
    switch(openedComponent){
      case "Dashboard":
        <Dashboard />
        break;
      case "Orders":
        <Orders />
        break;
      case "Users":
        <Users />
        break;
      case "Profile":
        <Profile />
        break;
      case "Products":
        <Products />
        break;
      default:
        <Dashboard />
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Protected Admin Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen">
                <SideBar />
                {renderDashboardContent()}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
}

export default App;
