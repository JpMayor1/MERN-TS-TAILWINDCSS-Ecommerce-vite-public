import { useUserStore } from "../../stores/useUserStore";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../../utils/types";
import {
    ShoppingBagIcon,
    ShoppingCartIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { useCheckOutInfoStore } from "../../stores/useCheckOutInfo";
import { useCartStore } from "../../stores/useCartStore";

const navigation = [
    { name: "Home", href: "/", current: "/" },
    { name: "Products", href: "/user/products", current: "/user/products" },
];

const UserNav = () => {
    const userlogout = useUserStore((state: UserState) => state.userLogout);
    const resetUser = useCheckOutInfoStore((state) => state.resetUser);
    const userInfo = useUserStore((state: UserState) => state.userInfo);
    const navigate = useNavigate();
    const location = useLocation();
    const deleteNote = useCheckOutInfoStore((state) => state.deleteNote);
    const clearCart = useCartStore((state) => state.clearCart);

    const handleLogout = () => {
        userlogout();
        deleteNote();
        resetUser();
        clearCart();
        navigate("/auth/login");
    };

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <>
            <Disclosure
                as="nav"
                className="bg-light text-dark drop-shadow fixed w-full z-50"
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl w-full px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-dark hover:bg-gray-700 hover:text-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link
                                            to="/"
                                            className="text-xl text-red-orange font-bold"
                                        >
                                            Logo
                                        </Link>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current ===
                                                            location.pathname
                                                            ? "text-red-orange"
                                                            : "text-dark hover:bg-gray-700 hover:text-red-orange",
                                                        "rounded-md px-3 py-2 text-sm font-medium text-dark"
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Profile dropdown */}

                                    <Menu
                                        as="div"
                                        className="relative ml-3 text-dark"
                                    >
                                        <div>
                                            {userInfo.username ? (
                                                <Menu.Button className="relative flex bg-gray-800 text-sm border-r py-1 px-3 text-red-orange hover:bg-light hover:text-red-orange/75 ease-in-out">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        Open user menu
                                                    </span>

                                                    <h1 className="text-lg">
                                                        {userInfo.username}
                                                    </h1>
                                                </Menu.Button>
                                            ) : (
                                                <Link
                                                    to={"/auth/login"}
                                                    className="text-xl text-red-orange"
                                                >
                                                    Login
                                                </Link>
                                            )}
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={"/user/cart"}
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "px-4 py-2 text-sm text-gray-700 flex gap-2 hover:bg-red-orange/80 hover:text-light",
                                                                location.pathname ===
                                                                    "/user/cart"
                                                                    ? "bg-red-orange text-light"
                                                                    : ""
                                                            )}
                                                        >
                                                            <ShoppingCartIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                            Cart
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={"/user/orders"}
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "px-4 py-2 text-sm text-gray-700 flex gap-2 hover:bg-red-orange/80 hover:text-light",
                                                                location.pathname ===
                                                                    "/user/orders"
                                                                    ? "bg-red-orange text-light"
                                                                    : ""
                                                            )}
                                                        >
                                                            <ShoppingBagIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                            Orders
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "w-full px-4 py-2 text-sm text-gray-700 flex gap-2 hover:bg-red-orange/80 hover:text-light"
                                                            )}
                                                        >
                                                            <PowerIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 border-t border-red-orange">
                                {navigation.map((item) => (
                                    <div
                                        className={`${
                                            location.pathname === item.current
                                                ? "text-red-orange"
                                                : "text-dark"
                                        } w-full text-center`}
                                        key={item.name}
                                    >
                                        <Link to={item.href}>{item.name}</Link>
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default UserNav;
