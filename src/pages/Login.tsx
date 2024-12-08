import LoginForm from "../components/auth/LoginForm";
import IllustrationSection from "../components/auth/IllustrationSection";
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-700">
            <LoginForm />
            <IllustrationSection />
        </div>
    );
};

export default LoginPage;
