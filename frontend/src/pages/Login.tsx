import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import { useCheckOutInfoStore } from "../stores/useCheckOutInfo";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const Api = import.meta.env.VITE_REACT_APP_API;
    const addUserInfo = useUserStore((state) => state.addUserInfo);
    const setUser = useCheckOutInfoStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await axios
            .post(`${Api}/api/user/login`, {
                email,
                password,
            })
            .then((res) => {
                const _id = res.data.loggedInUser._id;
                const username = res.data.loggedInUser.username;
                const email = res.data.loggedInUser.email;
                const isAdmin = res.data.loggedInUser.isAdmin;
                const cpNumber = res.data.loggedInUser.cpNumber;
                const token = res.data.token;
                const address = res.data.loggedInUser.address;

                const info = {
                    _id,
                    username,
                    email,
                    isAdmin,
                    token,
                    cpNumber,
                    address,
                };

                const checkOutInfo = {
                    id: _id,
                    username,
                    email,
                    cpNumber,
                    address,
                };

                setUser(checkOutInfo);
                addUserInfo(info);

                if (!isAdmin) {
                    navigate("/");
                } else {
                    navigate("/admin");
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="font-[sans-serif] flex items-center h-screen w-screen justify-center px-3 bg-bg-light">
            <Link
                to="/"
                className="text-dark hover:text-dark/75 text-xl font-bold absolute lg:top-[18px] lg:left-[65px] md:top-[18px] md:left-[65px] top-[18px] left-[18px]"
            >
                Logo
            </Link>

            <div className="flex max-h-[500px] max-w-[400px] w-full flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-light rounded-lg text-dark">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-dark"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-dark"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? (
                                    <BeatLoader color="white" size={20} />
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        <span>Don't have an account?</span>{" "}
                        <Link
                            to="/auth/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: "green",
                            color: "white",
                        },
                    },
                    error: {
                        style: {
                            background: "red",
                            color: "white",
                        },
                    },
                    position: "top-center",
                }}
            />
        </div>
    );
};

export default Login;
