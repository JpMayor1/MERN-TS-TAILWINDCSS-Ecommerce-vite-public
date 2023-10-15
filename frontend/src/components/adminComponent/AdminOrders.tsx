import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";
import ClipLoader from "react-spinners/ClipLoader";
import { OrderInfoType, OrderProductType } from "../../utils/types";
import OrderInfo from "./OrderInfo";

const AdminOrders = () => {
    const [orders, setOrders] = useState<OrderInfoType[]>([]);
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [isLoading, setIsLoading] = useState(false);
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [cpNumber, setCpNumber] = useState("");
    const [address, setAddress] = useState("");
    const [products, setProducts] = useState<OrderProductType[]>([]);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paid, setPaid] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        const getOrders = async () => {
            setIsLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios
                .get(`${API}/api/orders`, config)
                .then((res) => {
                    setOrders(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        };
        getOrders();
    }, [API, token]);

    const handleShowOrderInfo = (
        id: string,
        username: string,
        email: string,
        cpNumber: string,
        address: string,
        products: OrderProductType[],
        status: string,
        paymentMethod: string,
        paid: string,
        total: number,
        note: string
    ) => {
        setShowOrderInfo(!showOrderInfo);
        setId(id);
        setUsername(username);
        setEmail(email);
        setCpNumber(cpNumber);
        setAddress(address);
        setProducts(products);
        setTotal(total);
        setStatus(status);
        setPaymentMethod(paymentMethod);
        setPaid(paid);
        setNote(note);
    };

    const toggleShowModal = () => {
        setShowOrderInfo(!showOrderInfo);
    };

    return (
        <div className="h-[90%] w-full flex justify-center items-center">
            <div
                className={`h-[100%] w-[90%] bg-light p-2 relative ${
                    showOrderInfo ? "" : "overflow-y-scroll"
                }`}
            >
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <ClipLoader size={100} />
                    </div>
                ) : (
                    <>
                        {orders.length === 0 ? (
                            <>
                                <h1 className="text-center text-2xl font-bold">
                                    No Orders
                                </h1>
                            </>
                        ) : (
                            <>
                                <h1 className="text-center text-2xl font-bold">
                                    Orders
                                </h1>
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-100"
                                >
                                    {orders.map((order) => (
                                        <li
                                            key={order._id}
                                            className="flex justify-between gap-x-6 py-5 max-[420px]:flex-col max-[420px]:gap-2"
                                        >
                                            <div className="flex min-w-0 gap-x-4">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-lg font-semibold leading-6 text-gray-900">
                                                        {order.username
                                                            ? order.username
                                                            : "No Username"}
                                                    </p>
                                                    <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                                        {order.email
                                                            ? order.email
                                                            : "No Email"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="shrink-0 sm:flex sm:flex-col sm:items-center">
                                                <button
                                                    onClick={() =>
                                                        handleShowOrderInfo(
                                                            order._id,
                                                            order.username,
                                                            order.email,
                                                            order.cpNumber,
                                                            order.address,
                                                            order.products,
                                                            order.status,
                                                            order.paymentMethod,
                                                            order.paid,
                                                            order.total,
                                                            order.note
                                                        )
                                                    }
                                                    className="bg-green-dark text-light py-2 px-4 rounded-lg"
                                                >
                                                    Show More Info
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {showOrderInfo && (
                            <OrderInfo
                                _id={id}
                                username={username}
                                email={email}
                                cpNumber={cpNumber}
                                address={address}
                                products={products}
                                status={status}
                                paymentMethod={paymentMethod}
                                paid={paid}
                                total={total}
                                note={note}
                                toggleShowModal={toggleShowModal}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
