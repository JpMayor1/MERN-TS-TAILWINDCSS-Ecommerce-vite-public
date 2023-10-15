import Footer from "../../components/userComponent/Footer";
import UserNav from "../../components/userComponent/UserNav";
import { useCartStore } from "../../stores/useCartStore";
import { useCheckOutInfoStore } from "../../stores/useCheckOutInfo";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ProductCartType } from "../../utils/types";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import PaypalCheckoutBtn from "../../components/userComponent/PaypalCheckoutBtn";

const CheckOutPage = () => {
    const userInfo = useUserStore((state) => state.userInfo);
    const user = useCheckOutInfoStore((state) => state.user);
    const products = useCartStore((state) => state.products);

    // Note Functionalities
    const note = useCheckOutInfoStore((state) => state.note);
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteValue, setNoteValue] = useState("");
    const addNote = useCheckOutInfoStore((state) => state.addNote);
    const [showEditNote, setShowEditNote] = useState(false);
    const editNote = useCheckOutInfoStore((state) => state.editNote);
    const deleteNote = useCheckOutInfoStore((state) => state.deleteNote);
    // Note Functionalities Above

    // User Functionalities
    const [showEditUser, setShowEditUser] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [cpNumber, setCpNumber] = useState(user.cpNumber);
    const [address, setAddress] = useState(user.address);
    const editUser = useCheckOutInfoStore((state) => state.editUser);
    const setUser = useCheckOutInfoStore((state) => state.setUser);
    // User Functionalities Above

    // Payment Functionalities
    const [showCheckout, setShowCheckout] = useState(false);
    const [showOtherPaymentMethod, setShowOtherPaymentMethod] = useState(false);

    const handleShowCheckout = () => {
        setShowCheckout(true);
    };

    // handle other payment
    const handleShowOtherPayment = () => {
        setShowOtherPaymentMethod(!showOtherPaymentMethod);
    };
    // Payment Functionalities Above

    // checkout Functionalities
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // checkout Functionalities Above

    // User Functionalities
    const handleEditUser = () => {
        setShowEditUser(true);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleCpNumberChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCpNumber(event.target.value);
    };

    const handleAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddress(event.target.value);
    };

    const handleEditedUser = () => {
        if (
            username === "" ||
            email === "" ||
            cpNumber === "" ||
            address === ""
        ) {
            toast.error("Please fill up all the fields!");
            return;
        }
        const editedUser = {
            id: user.id,
            username,
            email,
            cpNumber,
            address,
        };

        editUser(editedUser);
        setShowEditUser(false);

        // redresh the page
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };
    // User Functionalities Above

    // Note Functionalities
    const handleShowAddNote = () => {
        setShowAddNote(true);
    };

    const handleShowEditNote = () => {
        setShowEditNote(true);
    };

    const handleNoteChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNoteValue(event.target.value);
    };

    const handleAddNote = () => {
        // Use the 'note' state value here or send it to your desired function.
        if (noteValue === "") {
            toast.error("Note is empty!");
            return;
        }
        addNote(noteValue);
        setNoteValue("");
        toast.success("Note added!");
        setShowAddNote(false);
    };

    const handleEditedNote = () => {
        if (noteValue === "") {
            toast.error("Note is empty!");
            return;
        }
        editNote(noteValue);
        setNoteValue("");
        toast.success("Note edited!");
        setShowEditNote(false);
    };
    // Note Functionalities Above

    // Calculate Total
    const calculateTotal = (products: ProductCartType[]) => {
        return products.reduce((total, product) => total + product.subTotal, 0);
    };

    const total = calculateTotal(products);
    // Calculate Total Above

    // handle checkout
    const handleCheckOut = async () => {
        setIsLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const order = {
            paypalOrderId: "",
            userId: user.id,
            username,
            email,
            cpNumber,
            address,
            products: products.map((product: ProductCartType) => ({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity,
                subTotal: product.subTotal,
            })),
            total: total,
            paymentMethod: "cod",
            paid: "unpaid",
            note: note,
        };

        await axios
            .post(`${API}/api/orders/create`, order, config)
            .then(() => {
                const resetUser = {
                    id: userInfo._id,
                    username: userInfo.username,
                    email: userInfo.email,
                    cpNumber: userInfo.cpNumber,
                    address: userInfo.address,
                };
                setUser(resetUser);
                toast.success("Checkout Successful!");
                setIsLoading(false);
                setTimeout(() => {
                    navigate("/user/orders");
                }, 2000);
            })
            .catch((err) => {
                toast.error("Checkout Failed! Please try again.");
                console.log(err);
                setIsLoading(false);
            });
    };
    // handle checkout above

    return (
        <>
            <div className="h-full w-screen flex flex-col items-center">
                <UserNav />
                <div
                    className={`max-w-[1200px] h-full w-full flex mt-16 p-5 flex-col sm:flex-row ${
                        showCheckout ? "sm:h-[calc(100vh-164px)]" : ""
                    }`}
                >
                    <div className="relative w-full h-full border-b sm:border-r sm:border-b-0 border-red-orange mb-3 p-3">
                        <h1 className="text-2xl font-bold">
                            Personal Informations
                        </h1>
                        <div className="w-full h-full flex flex-col gap-7">
                            {/* // User Functionalities */}
                            {showEditUser ? (
                                <div className="text-xl font-semibold">
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-lg leading-6 text-gray-900 mt-2 font-semibold"
                                        >
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                autoComplete="username"
                                                required
                                                className="input-field"
                                                value={username}
                                                onChange={handleNameChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-lg leading-6 text-gray-900 mt-2 font-semibold"
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
                                                className="input-field"
                                                value={email}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="cpNumber"
                                            className="block text-lg leading-6 text-gray-900 mt-2 font-semibold"
                                        >
                                            CP Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="cpNumber"
                                                name="cpNumber"
                                                type="text"
                                                required
                                                className="input-field"
                                                value={cpNumber}
                                                onChange={handleCpNumberChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <h1 className="text-2xl font-bold">
                                            Location
                                        </h1>
                                        <div>
                                            <label
                                                htmlFor="address"
                                                className="block text-lg leading-6 text-gray-900 mt-2 font-semibold"
                                            >
                                                Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    autoComplete="address"
                                                    className="input-field"
                                                    value={address}
                                                    onChange={
                                                        handleAddressChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                            onClick={handleEditedUser}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-red-orange hover:bg-red-orange/75 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                            onClick={() =>
                                                setShowEditUser(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xl font-semibold">
                                    <p className="flex items-center gap-2">
                                        <span className="text-2xl">
                                            <FaUserCircle />
                                        </span>
                                        {username}
                                    </p>
                                    <p>
                                        <i>{email}</i>
                                    </p>
                                    {cpNumber}
                                    <button
                                        className="bg-green-dark hover:bg-green-dark/75 text-white py-2 px-4 rounded-md font-semibold transition duration-300 absolute top-16 right-5 sm:top-12 "
                                        onClick={handleEditUser}
                                    >
                                        Edit
                                    </button>
                                    <div className="mt-5">
                                        <h1 className="text-2xl font-bold">
                                            Location
                                        </h1>
                                        <p className="text-xl font-semibold">
                                            {address}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* // User Functionalities Above*/}
                            {/* // Note Functionalities */}
                            <div className="text-xl font-semibold">
                                <h1 className="text-2xl font-bold">Note</h1>
                                {note ? (
                                    <>
                                        {showEditNote ? (
                                            <div className="mb-4">
                                                <label
                                                    className="block text-xl font-semibold mb-2"
                                                    htmlFor="note"
                                                >
                                                    Edit Note:
                                                </label>
                                                <textarea
                                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-lg focus:ring focus:ring-blue-200"
                                                    name="note"
                                                    id="note"
                                                    rows={3}
                                                    style={{ resize: "none" }}
                                                    placeholder="Enter your note here..."
                                                    value={noteValue}
                                                    onChange={handleNoteChange}
                                                ></textarea>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300 mr-2"
                                                    type="button"
                                                    onClick={handleEditedNote}
                                                >
                                                    Save Edit
                                                </button>
                                                <button
                                                    className="bg-red-orange hover:bg-red-orange/75 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowEditNote(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between pr-3">
                                                <p className="text-xl font-semibold">
                                                    {note}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="bg-green-dark hover:bg-green-dark/75 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                        onClick={
                                                            handleShowEditNote
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-orange hover:bg-red-orange/75 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                        onClick={deleteNote}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {showAddNote ? (
                                            <div className="mb-4">
                                                <label
                                                    className="block text-xl font-semibold mb-2"
                                                    htmlFor="note"
                                                >
                                                    Add Note:
                                                </label>
                                                <textarea
                                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-lg focus:ring focus:ring-blue-200"
                                                    name="note"
                                                    id="note"
                                                    rows={3}
                                                    style={{ resize: "none" }}
                                                    placeholder="Enter your note here..."
                                                    value={noteValue}
                                                    onChange={handleNoteChange}
                                                ></textarea>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300 mr-2"
                                                    type="button"
                                                    onClick={handleAddNote}
                                                >
                                                    Add Note
                                                </button>
                                                <button
                                                    className="bg-red-orange hover:bg-red-orange/75 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowAddNote(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                onClick={handleShowAddNote}
                                            >
                                                AddNote
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                            {/* // Note Functionalities Above */}
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col items-center">
                        {/* // Products */}
                        {isLoading ? (
                            <div className="absolute h-full w-full flex justify-center items-center">
                                <ClipLoader size={100} color="black" />
                            </div>
                        ) : (
                            <>
                                <div className="w-[90%]">
                                    <h1 className="text-2xl font-semibold mb-2">
                                        Items
                                    </h1>
                                    <div>
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-200 text-gray-700 text-lg font-semibold">
                                                    <th className="py-2 px-1 text-center">
                                                        Name
                                                    </th>
                                                    <th className="py-2 px-1 text-center">
                                                        Price
                                                    </th>
                                                    <th className="py-2 px-1 text-center">
                                                        Quantity
                                                    </th>
                                                    <th className="py-2 px-1 text-center">
                                                        Sub-total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((product) => (
                                                    <tr
                                                        key={product._id}
                                                        className="text-base font-medium hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-3 text-center">
                                                            {product.name}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            {"₱" +
                                                                product.price.toFixed(
                                                                    2
                                                                )}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            {product.quantity}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            {"₱" +
                                                                product.subTotal.toFixed(
                                                                    2
                                                                )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr className="text-xl font-bold">
                                                    <td
                                                        colSpan={3}
                                                        className="py-3 px-3 text-right"
                                                    >
                                                        Cash Total:
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        {"₱" + total.toFixed(2)}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                {/* division */}
                                <div className="w-full flex flex-col items-center">
                                    <h1 className="text-2xl font-semibold my-2">
                                        Payment Methods
                                    </h1>
                                    <div className="flex flex-col gap-2 items-center">
                                        <button
                                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                            onClick={handleShowCheckout}
                                        >
                                            Cash on Delivery
                                        </button>
                                        {showCheckout ? (
                                            <div className="flex gap-3">
                                                <button
                                                    className="mt-2 bg-green-dark hover:bg-green-dark/80 text-white py-2 px-4 rounded-md font-semibold transition duration-300 mr-2"
                                                    onClick={handleCheckOut}
                                                >
                                                    Checkout
                                                </button>
                                                <button
                                                    className="mt-2 bg-red-orange hover:bg-red-orange/80 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                    onClick={() =>
                                                        setShowCheckout(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <p>Or</p>
                                                <button
                                                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                    onClick={
                                                        handleShowOtherPayment
                                                    }
                                                >
                                                    Other
                                                </button>
                                                {showOtherPaymentMethod ? (
                                                    <div className="w-full flex flex-col sm:flex-row gap-2">
                                                        <div className="w-full flex flex-col pt-2">
                                                            <PaypalCheckoutBtn
                                                                total={total}
                                                            />
                                                            <div className="text-sm sm:text-base">
                                                                <h2 className="font-semibold">
                                                                    Demo paypal
                                                                    Acc.
                                                                </h2>
                                                                <p>
                                                                    <span className="font-semibold">
                                                                        email:{" "}
                                                                    </span>
                                                                </p>
                                                                <p className="whitespace-nowrap">
                                                                    sb-jphxp27207256@personal.example.com
                                                                </p>
                                                                <p>
                                                                    {" "}
                                                                    <span className="font-semibold">
                                                                        password:{" "}
                                                                    </span>{" "}
                                                                    demoexample
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="w-full sm:w-1/2 flex flex-col items-center">
                                                            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold transition duration-300 cursor-not-allowed">
                                                                Gcash
                                                            </button>
                                                            <p>Coming Soon!</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
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
        </>
    );
};

export default CheckOutPage;
