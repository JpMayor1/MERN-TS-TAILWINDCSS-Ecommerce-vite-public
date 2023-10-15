import { useEffect, useState } from "react";
import Footer from "../../components/userComponent/Footer";
import UserNav from "../../components/userComponent/UserNav";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserStore } from "../../stores/useUserStore";
import { OrderInfoType } from "../../utils/types";
import { Link } from "react-router-dom";

const OrdersPage = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const userInfo = useUserStore((state) => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<OrderInfoType[]>([]);
    const id = userInfo._id;

    useEffect(() => {
        setIsLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const getOrders = async () => {
            try {
                const response = await axios.get(
                    `${API}/api/orders/user/${id}`,
                    config
                );
                const sortedOrders = response.data.sort(
                    (a: OrderInfoType, b: OrderInfoType) => {
                        // Sort orders in descending order based on their creation date
                        const dateA = new Date(a.createdAt!);
                        const dateB = new Date(b.createdAt!);
                        return dateB.getTime() - dateA.getTime();
                    }
                );

                setOrders(sortedOrders);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        getOrders();
    }, [token, API, setOrders, id]);

    return (
        <div className="font-[sans-serif] text-base w-screen h-full">
            <UserNav />
            <div className="h-screen w-screen pt-16 flex items-center justify-center mb-5 overflow-y-scroll">
                <div className="max-w-[1200px] h-full w-[90%] flex flex-col items-center">
                    {isLoading ? (
                        <>
                            <ClipLoader size={100} color="black" />
                        </>
                    ) : (
                        <>
                            {orders.length === 0 ? (
                                <>
                                    <div className="h-full w-screen flex items-center justify-center">
                                        <h1 className="text-lg sm:text-xl mt-6 font-bold">
                                            No Order Yet
                                        </h1>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-lg sm:text-xl mt-6 font-bold">
                                        Orders
                                    </h1>
                                    <div className="h-full w-full p-3">
                                        <ul
                                            role="list"
                                            className="divide-y divide-gray-100"
                                        >
                                            {orders.map((order) => (
                                                <li
                                                    key={order._id}
                                                    className="flex justify-between gap-x-6 py-5"
                                                >
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-lg font-semibold leading-6 text-gray-900">
                                                                {order.username}
                                                            </p>
                                                            <p className="mt-1 truncate text-lg leading-5 text-gray-500">
                                                                {
                                                                    // Format time and date
                                                                    new Date(
                                                                        order.createdAt!
                                                                    ).toLocaleString(
                                                                        "en-GB",
                                                                        {
                                                                            day: "numeric",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                            hour: "numeric",
                                                                            minute: "numeric",
                                                                        }
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:flex-col sm:items-end">
                                                        <Link
                                                            to={`/user/orders/${order._id}`}
                                                            className="bg-green-dark hover:bg-green-dark/75 text-white py-2 px-4 rounded-md font-semibold transition-all"
                                                        >
                                                            Show More
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrdersPage;
