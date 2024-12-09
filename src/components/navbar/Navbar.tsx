import { useAuth } from "../../contexts/AuthContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutConfirmationDialog from "../../components/logout/LogoutDialog";

const Navbar: React.FC = () => {
    const { token } = useAuth();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="bg-primary py-2 text-white fixed top-0 w-full z-10 shadow-lg">
            <div className="flex justify-between items-center px-4 py-3 md:px-8">
                {/* Logo */}
                <Link to="/inventory" className="font-semibold text-lg">
                    QR Based Inventory
                </Link>

                {/* Hamburger Menu Button (visible only on mobile) */}
                <button
                    className="block md:hidden text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isMobileMenuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        ></path>
                    </svg>
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-6">
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-primary text-white flex flex-col gap-4 px-4 py-4">
                    <Link
                        to="/"
                        className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                        onClick={toggleMobileMenu}
                    >
                        QR Generator
                    </Link>
                    <Link
                        to="/scanqr"
                        className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                        onClick={toggleMobileMenu}
                    >
                        Scan QR
                    </Link>
                    {token ? (
                        <div>
                            <LogoutConfirmationDialog className=" px-4 " />
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                                onClick={toggleMobileMenu}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hover:bg-white hover:text-primary px-4 py-2 rounded-3xl"
                                onClick={toggleMobileMenu}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
