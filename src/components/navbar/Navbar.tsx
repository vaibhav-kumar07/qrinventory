import { useAuth } from "../../contexts/AuthContext";
import React from "react";
import { Link } from "react-router-dom";
import LogoutConfirmationDialog from "../../components/logout/LogoutDialog";

const Navbar: React.FC = () => {
    const { token } = useAuth();
    return (
        <nav className="bg-primary py-2 text-white fixed top-0 w-full z-10">
            <div className="flex justify-between items-center px-4">
                {/* Logo */}
                <Link to="/inventory" className="font-semibold text-lg">
                    QR Based Inventory
                </Link>

                {/* Links */}
                <div className="flex gap-6">
                    <Link
                        to="/"
                        className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                    >
                        QR Generator
                    </Link>
                    <Link
                        to="/scanqr"
                        className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                    >
                        Scan QR
                    </Link>
                    {token ? (
                        <LogoutConfirmationDialog />
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
