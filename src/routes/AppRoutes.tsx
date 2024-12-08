import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import QRGeneratorPage from "../pages/QrGenerator";
import ScanQRPage from "../pages/QrScanner";
import DashboardPage from "../pages/Dashboard"; // Import your inventory component
import Navbar from "../components/navbar/Navbar";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";

const AppRoutes: React.FC = () => {
    return (
        <div className="h-full md:h-screen ">
            <Navbar />
            <Routes>
                <Route path="/inventory" element={<DashboardPage />} />
                <Route path="/" element={<QRGeneratorPage />} />
                <Route path="/scanqr" element={<ScanQRPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/inventory" />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
