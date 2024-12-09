import RegisterForm from "../components/auth/RegisterForm";
import IllustrationSection from "../components/auth/IllustrationSection";
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100 pt-24 px-4 md:px-10 md:pb-10">
            <RegisterForm />
            <IllustrationSection />
        </div>
    );
};

export default LoginPage;
