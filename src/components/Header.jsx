import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        toast.success('Successfully Logged Out');
        navigate('/');
    };

    return (
        <div className="h-16 px-4 flex justify-between items-center bg-white">
            <div className="flex flex-col">
                <h2 className="font-manrope font-bold text-xl md:text-xl leading-7 md:leading-9 text-custom-hover text-red-500 ml-4">
                    tailwebs.
                </h2>
            </div>
            <div className="flex items-center gap-2 mr-2">
                <Link
                    to="/"
                    className=" text-black font-semibold rounded-md w-20 h-8 flex justify-center items-center text-center hover:bg-red-600 hover:text-white"
                >
                    Home
                </Link>
                <button
                    onClick={handleLogout}
                    className=" text-black font-semibold rounded-md w-20 h-8 flex justify-center items-center text-center hover:bg-red-600 hover:text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header;
