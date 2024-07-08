import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UserCircleIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { UserState } from "../../utils/types";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Sidebar() {
    const userlogout = useUserStore((state: UserState) => state.userLogout);
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const handleLogout = () => {
        userlogout();
        navigate("/auth/login");
    };

    return (
        <div
            className={` ${
                expanded ? "w-20" : "w-64 max-[600px]:absolute top-0 left-0"
            }  flex flex-col  h-screen px-4 py-4 bg-light border-r border-r-gray z-10 transition-all`}
        >
            <div
                className={`${
                    expanded ? "justify-center" : "justify-between"
                } flex items-center border-b border-gray pb-3`}
            >
                {expanded ? (
                    <Bars3Icon
                        className="block h-8 w-8 cursor-pointer"
                        aria-hidden="true"
                        onClick={handleExpand}
                    />
                ) : (
                    <>
                        <h2 className="text-3xl font-semibold text-dark">
                            Admin
                        </h2>

                        <XMarkIcon
                            className="block h-8 w-8 cursor-pointer"
                            aria-hidden="true"
                            onClick={handleExpand}
                        />
                    </>
                )}
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link
                        to="/admin"
                        className={`flex items-center px-4 py-2 w-full rounded-md ${
                            location.pathname === "/admin"
                                ? "bg-green-light text-green-dark"
                                : "bg-light text-gray"
                        }`}
                    >
                        {expanded ? (
                            <PresentationChartBarIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <>
                                <PresentationChartBarIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                                <span className="mx-4 font-medium">
                                    Dashboard
                                </span>
                            </>
                        )}
                    </Link>

                    <Link
                        to="/admin/products"
                        className={`flex items-center px-4 py-2 w-full rounded-md ${
                            location.pathname === "/admin/products"
                                ? "bg-green-light text-green-dark"
                                : "bg-light text-gray"
                        } text-gray-700 dark:bg-gray-700 dark:text-gray-200`}
                    >
                        {expanded ? (
                            <ShoppingBagIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <>
                                <ShoppingBagIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                                <span className="mx-4 font-medium">
                                    Products
                                </span>
                            </>
                        )}
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={`flex items-center px-4 py-2 w-full rounded-md ${
                            location.pathname === "/admin/orders"
                                ? "bg-green-light text-green-dark"
                                : "bg-light text-gray"
                        } text-gray-700 dark:bg-gray-700 dark:text-gray-200`}
                    >
                        {expanded ? (
                            <ShoppingCartIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <>
                                <ShoppingCartIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                                <span className="mx-4 font-medium">Orders</span>
                            </>
                        )}
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`flex items-center px-4 py-2 w-full rounded-md ${
                            location.pathname === "/admin/users"
                                ? "bg-green-light text-green-dark"
                                : "bg-light text-gray"
                        } text-gray-700 dark:bg-gray-700 dark:text-gray-200`}
                    >
                        {expanded ? (
                            <UserCircleIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                        ) : (
                            <>
                                <UserCircleIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                                <span className="mx-4 font-medium">Users</span>
                            </>
                        )}
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center mt-5 px-4 py-2 text-light bg-red-orange rounded-md "
                >
                    {expanded ? (
                        <PowerIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                        <>
                            <PowerIcon className="w-5 h-5" aria-hidden="true" />
                            <span className="mx-4 font-medium">Logout</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
