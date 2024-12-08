// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { TagProvider } from "./contexts/TagContext";

const App: React.FC = () => {
    return (
        <div className="md:h-screen">
            <TagProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </TagProvider>
        </div>
    );
};

export default App;
