import { useNavigate } from "react-router-dom";
import React from "react";

const ALogout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            
            await fetch("/api/admin/logout", {
                method: "GET",
                credentials: "include", // Ensure cookies are sent and cleared properly
            });

            // Remove token from localStorage (if used for authentication)
            localStorage.removeItem("adminToken");

            // Redirect to login page
            navigate("/login/:userId");

        } 
        
        catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        
        <button
            onClick={handleLogout}
            className="bg-red-700 text-white w-28 h-12 font-bold text-xl mr-28 mt-12 hover:bg-green-700"
        >
            Logout
        </button>
    );
};

export default ALogout;
