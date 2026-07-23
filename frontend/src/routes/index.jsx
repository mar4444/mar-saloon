import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Features from "../pages/Features";
import NewSales from "../pages/NewSales";
import Setting from "../pages/Setting";
import SalesHistory from "../pages/SalesHistory";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/features" element={<Features />} />
                <Route path="/new-sales" element={<NewSales />} />
                <Route path="/sales-history" element={<SalesHistory />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </BrowserRouter>
    )
}