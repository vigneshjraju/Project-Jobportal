import { useNavigate } from "react-router-dom";
import React from "react";

const LogoutButton = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            
            await fetch("/api/jobseeker/logout", {
                method: "GET",
                credentials: "include", // Ensure cookies are sent and cleared properly
            });

            // Remove token from localStorage (if used for authentication)
            localStorage.removeItem("authtoken");

            // Redirect to login page
            navigate("/login");

        } 
        
        catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (

        <button
            onClick={handleLogout}
            className="bg-red-700 text-white w-20 sm:w-28 h-8 sm:h-12 font-bold text-sm sm:text-xl mr-4 sm:mr-28 mt-4 sm:mt-12 hover:bg-green-700"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
