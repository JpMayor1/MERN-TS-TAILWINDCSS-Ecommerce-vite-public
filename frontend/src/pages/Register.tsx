import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpNumber, setCpNumber] = useState("");
    const [address, setAdress] = useState("");
    const Api = import.meta.env.VITE_REACT_APP_API;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios
            .post(`${Api}/api/user/register`, {
                username,
                email,
                password,
                cpNumber,
                address,
            })
            .then((res) => {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/auth/login");
                }, 2000);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                console.log(err);
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
            <div className="flex max-h-[570px] max-w-[400px] w-full flex-col justify-center px-6 py-10 lg:px-8 h-full bg-light rounded-lg text-dark overflow-y-scroll">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 pt-10">
                        Register an account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-dark"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
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
                            <div className="mt-1">
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
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="cpNumber"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Phone Number
                                </label>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="cpNumber"
                                    name="cpNumber"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-dark"
                                    value={cpNumber}
                                    onChange={(e) =>
                                        setCpNumber(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Address
                                </label>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-dark"
                                    value={address}
                                    onChange={(e) =>
                                        setAdress(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        <span>Already has an account?</span>{" "}
                        <Link
                            to="/auth/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Login here
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

export default Register;
