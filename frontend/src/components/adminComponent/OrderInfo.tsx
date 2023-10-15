import { useState } from "react";
import { OrderInfoType } from "../../utils/types";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const OrderInfo = ({
    toggleShowModal,
    _id,
    username,
    email,
    cpNumber,
    address,
    products,
    status,
    paymentMethod,
    note,
    paid,
    total,
}: OrderInfoType) => {
    const [editPaid, setEditPaid] = useState<string>(paid);
    const [editStatus, setEditStatus] = useState<string>(status);
    const [isEdtitingPaid, setIsEditingPaid] = useState<boolean>(false);
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const navigate = useNavigate();

    const handleEditPaid = () => {
        setIsEditingPaid(true);
    };

    const handleEditStatus = () => {
        setIsEditingStatus(true);
    };

    const handleUpdatePaidAndStatus = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios
            .put(
                `${API}/api/orders/update/${_id}`,
                { paid: editPaid, status: editStatus },
                config
            )
            .then(() => {
                toast.success("Updated Successfully");
                if (isEdtitingPaid) {
                    setIsEditingPaid(false);
                }
                if (isEditingStatus) {
                    setIsEditingStatus(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios
            .delete(`${API}/api/orders/delete/${_id}`, config)
            .then(() => {
                toast.success("Order Deleted Successfully");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-light p-2 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">Order Information</h1>
                <button
                    onClick={toggleShowModal}
                    className="bg-red-orange text-light mr-1 py-2 px-4 rounded-lg max-[530px]:py-1 max-[530px]:px-2"
                >
                    Close
                </button>
            </div>

            <div className="w-full flex max-[960px]:flex-col">
                <div className="w-1/2 max-[960px]:w-full max-[960px]:mt-3">
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
                                        <p className="font-bold">Price:</p>
                                        <span> {product.price}</span>
                                    </div>

                                    <div className="w-full flex gap-2">
                                        <p className="font-bold">Quantity:</p>
                                        <span>{product.quantity}</span>
                                    </div>

                                    <div className="w-full flex gap-2">
                                        <p className="font-bold">Sub Total:</p>
                                        <span> {product.subTotal}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 max-[960px]:w-full mr-2">
                    <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Order ID:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{_id}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">User Name:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{username}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">User Email:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{email}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Cp number:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{cpNumber}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Address:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{address}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[630px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Note:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{note}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Payment Method:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{paymentMethod}</span>
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Paid:</p>
                        <div
                            className={`${
                                isEdtitingPaid ? "w-[60%]" : "w-1/2"
                            }  max-[530px]:w-full flex items-center justify-between`}
                        >
                            {isEdtitingPaid ? (
                                <>
                                    <select
                                        name="paid"
                                        id="paid"
                                        value={editPaid}
                                        onChange={(e) =>
                                            setEditPaid(e.target.value)
                                        }
                                        className="block w-full px-1 py-1 mr-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option
                                            value="paid"
                                            className="px-1 py-1 bg-light text-dark"
                                        >
                                            paid
                                        </option>
                                        <option
                                            value="unpaid"
                                            className="px-1 py-1 bg-light text-dark"
                                        >
                                            unpaid
                                        </option>
                                    </select>
                                    <button
                                        className="bg-green-dark text-light py-1 px-2 rounded-lg"
                                        onClick={handleUpdatePaidAndStatus}
                                    >
                                        update
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="font-normal">
                                        {editPaid}
                                    </span>
                                    <button
                                        className="bg-green-dark text-light py-1 px-2 rounded-lg"
                                        onClick={handleEditPaid}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Status:</p>
                        <div
                            className={`${
                                isEditingStatus ? "w-[60%]" : "w-1/2"
                            }  max-[530px]:w-full flex items-center justify-between`}
                        >
                            {isEditingStatus ? (
                                <>
                                    <select
                                        name="status"
                                        id="status"
                                        value={editStatus}
                                        onChange={(e) =>
                                            setEditStatus(e.target.value)
                                        }
                                        className="block w-full px-1 py-1 mr-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option
                                            value="pending"
                                            className="px-1 py-1 bg-light text-dark"
                                        >
                                            pending
                                        </option>
                                        <option
                                            value="completed"
                                            className="px-1 py-1 bg-light text-dark"
                                        >
                                            completed
                                        </option>
                                        <option
                                            value="cancelled"
                                            className="px-1 py-1 bg-light text-dark"
                                        >
                                            cancelled
                                        </option>
                                    </select>
                                    <button
                                        className="bg-green-dark text-light py-1 px-2 rounded-lg"
                                        onClick={handleUpdatePaidAndStatus}
                                    >
                                        update
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="font-normal">
                                        {editStatus}
                                    </span>
                                    <button
                                        className="bg-green-dark text-light py-1 px-2 rounded-lg"
                                        onClick={handleEditStatus}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="m-2 flex justify-between max-[530px]:flex-col border-b border-dark p-2">
                        <p className="font-bold">Total:</p>
                        <div className="w-1/2 flex justify-start">
                            <span className="font-normal">{total}</span>
                        </div>
                    </div>
                    <button
                        className="bg-red-orange w-full text-light py-2 rounded-lg"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
