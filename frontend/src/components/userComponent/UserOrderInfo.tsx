import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNav from "./UserNav";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserStore } from "../../stores/useUserStore";
import { ProductCartType } from "../../utils/types";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const UserOrderInfo = () => {
    // Use useParams to get the id from route params
    const { id } = useParams();

    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [isLoading, setIsLoading] = useState(false);

    const [paypalOrderId, setPaypalOrderId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [cpNumber, setCpNumber] = useState("");
    const [address, setAddress] = useState("");
    const [products, setProducts] = useState<ProductCartType[]>([]);
    const [status, setStatus] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paid, setPaid] = useState(false);
    const [total, setTotal] = useState(0);
    const [note, setNote] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const getOrder = async () => {
            await axios
                .get(`${API}/api/orders/user/order/${id}`, config)
                .then((res) => {
                    setCreatedAt(res.data.createdAt);
                    setPaypalOrderId(res.data.paypalOrderId);
                    setUsername(res.data.username);
                    setEmail(res.data.email);
                    setCpNumber(res.data.cpNumber);
                    setAddress(res.data.address);
                    setProducts(res.data.products);
                    setStatus(res.data.status);
                    setPaymentMethod(res.data.paymentMethod);
                    setPaid(res.data.paid);
                    setTotal(res.data.total);
                    setNote(res.data.note);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        };

        getOrder();
    }, [API, token, id]);

    return (
        <>
            <UserNav />
            {isLoading ? (
                <>
                    <div className="h-screen w-screen flex items-center justify-center">
                        <ClipLoader size={100} color="black" />
                    </div>
                </>
            ) : (
                <>
                    <div className="h-full w-screen flex items-center justify-start flex-col overflow-y-scroll pt-20">
                        <Link
                            to="/user/orders"
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300 absolute top-16 left-8"
                        >
                            Back{" "}
                        </Link>
                        <div className="w-full flex max-[960px]:flex-col">
                            <div className="w-1/2 mt-6 max-[960px]:w-full max-[960px]:mt-3">
                                {products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="m-2 flex max-[630px]:flex-col border-b border-dark p-2"
                                    >
                                        <div className="m-2 flex flex-col p-2">
                                            <div className="max-w-[300px] w-full my-2">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="w-full flex flex-col">
                                                <div className="w-full flex gap-2">
                                                    <p className="font-bold">
                                                        Product Name:
                                                    </p>
                                                    <span> {product.name}</span>
                                                </div>

                                                <div className="w-full flex gap-2">
                                                    <p className="font-bold">
                                                        Price:
                                                    </p>
                                                    <span>
                                                        {" "}
                                                        {product.price}
                                                    </span>
                                                </div>

                                                <div className="w-full flex gap-2">
                                                    <p className="font-bold">
                                                        Quantity:
                                                    </p>
                                                    <span>
                                                        {product.quantity}
                                                    </span>
                                                </div>

                                                <div className="w-full flex gap-2">
                                                    <p className="font-bold">
                                                        Sub Total:
                                                    </p>
                                                    <span>
                                                        {" "}
                                                        {product.subTotal}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-1/2 max-[960px]:w-full mr-2">
                                <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Date/Time:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {new Date(createdAt).toLocaleString(
                                                "en-GB",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Order ID:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {id}
                                        </span>
                                    </div>
                                </div>

                                {paypalOrderId && (
                                    <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                                        <p className="font-bold">
                                            Paypal Order ID:
                                        </p>
                                        <div className="w-1/2 flex justify-start">
                                            <span className="font-normal">
                                                {paypalOrderId}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">User Name:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {username}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">User Email:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {email}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Cp number:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {cpNumber}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Address:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {address}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Note:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {note}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Payment Method:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {paymentMethod}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Paid:</p>
                                    <div
                                        className={`max-[530px]:w-full flex items-center justify-between w-1/2`}
                                    >
                                        <span className="font-normal">
                                            {paid}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Status:</p>
                                    <div
                                        className={`max-[530px]:w-full flex items-center justify-between w-1/2`}
                                    >
                                        <span className="font-normal">
                                            {status}
                                        </span>
                                    </div>
                                </div>

                                <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                                    <p className="font-bold">Total:</p>
                                    <div className="w-1/2 flex justify-start">
                                        <span className="font-normal">
                                            {total}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </>
    );
};

export default UserOrderInfo;
