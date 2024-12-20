import LoginForm from "../components/auth/LoginForm";
import IllustrationSection from "../components/auth/IllustrationSection";
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100 pt-24 px-4 md:px-10 md:pb-10">
            <LoginForm />
            <IllustrationSection />
        </div>
    );
};

export default LoginPage;
