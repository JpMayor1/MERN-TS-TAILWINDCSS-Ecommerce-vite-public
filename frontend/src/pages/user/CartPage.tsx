import { useEffect } from "react";
import Footer from "../../components/userComponent/Footer";
import UserNav from "../../components/userComponent/UserNav";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "../../stores/useCartStore";
import {
    AiOutlineMinus,
    AiOutlinePlusCircle,
    AiOutlineClose,
} from "react-icons/ai";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { ProductCartType } from "../../utils/types";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useCheckOutInfoStore } from "../../stores/useCheckOutInfo";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";
import ClipLoader from "react-spinners/ClipLoader";

const CartPage = () => {
    const products = useCartStore((state) => state.products);
    const removeProduct = useCartStore((state) => state.removeProduct);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const [open, setOpen] = useState(false);
    const [showClearCart, setShowClearCart] = useState(false);
    const clearCart = useCartStore((state) => state.clearCart);
    const [noteValue, setNoteValue] = useState("");
    const addNote = useCheckOutInfoStore((state) => state.addNote);
    const [deleteId, setDeleteId] = useState("");
    const [deleteProductName, setDeleteProductName] = useState("");

    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const UserId = useUserStore((state) => state.userInfo._id);
    const setProducts = useCartStore((state) => state.setProducts);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getCartByUserId = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios
                .get(`${API}/api/cart/${UserId}`, config)
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        };

        getCartByUserId();
    }, [API, UserId, token, setProducts]);

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
    };

    const calculateTotal = (products: ProductCartType[]) => {
        return products.reduce((total, product) => total + product.subTotal, 0);
    };

    const total = calculateTotal(products);

    const handleShowModal = () => {
        setOpen(true);
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const handleIncreaseQuantity = async (_id: string) => {
        const productToUpdate = products.find((product) => product._id === _id);

        if (productToUpdate) {
            const newQuantity = productToUpdate.quantity + 1;
            updateQuantity(_id, newQuantity);
            const newSubTotal = newQuantity * productToUpdate.price;

            // increase quantity
            await axios.put(`${API}/api/cart/increase/${_id}`, {}, config);

            // Update subTotal
            await axios.put(
                `${API}/api/cart/updateSubTotal/${_id}`,
                {
                    subTotal: newSubTotal,
                },
                config
            );
        }
    };

    const handleDecreaseQuantity = async (_id: string) => {
        const productToUpdate = products.find((product) => product._id === _id);

        if (productToUpdate && productToUpdate.quantity > 1) {
            const newQuantity = productToUpdate.quantity - 1;
            updateQuantity(_id, newQuantity);
            const newSubTotal = newQuantity * productToUpdate.price;

            // decrease quantity
            await axios.put(`${API}/api/cart/decrease/${_id}`, {}, config);

            // Update subTotal
            await axios.put(
                `${API}/api/cart/updateSubTotal/${_id}`,
                {
                    subTotal: newSubTotal,
                },
                config
            );
        }
    };

    const cancelButtonRef = useRef(null);

    // Remove Single product from cart
    const handleRemoveProduct = async () => {
        removeProduct(deleteId);

        // Remove product from cart
        await axios.delete(`${API}/api/cart/remove/${deleteId}`, config);
    };

    // Clear Cart
    const handleClearCart = async () => {
        clearCart();
        setShowClearCart(false);
        await axios.delete(`${API}/api/cart/clear/${UserId}`, config);
    };

    const handleShowClearCart = async () => {
        setShowClearCart(true);
    };

    return (
        <div
            className={`${
                products.length > 0 ? "h-full" : "h-screen"
            } font-[sans-serif] text-base w-full`}
        >
            <UserNav />
            {isLoading ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <ClipLoader size={100} color="black" />
                </div>
            ) : (
                <>
                    <div className="w-full h-full flex flex-col pt-16 items-center">
                        <div className="bg-red-orange w-fit m-5 py-2 px-4 text-light rounded-lg">
                            <h1 className="text-lg sm:text-xl">My Cart</h1>
                        </div>
                        <div className="max-w-[1200px] w-[90%] h-full flex flex-col justify-center items-start sm:flex-row sm:gap-2">
                            <div className="w-full h-full">
                                {products.length > 0 ? (
                                    <>
                                        <div className="flex items-center justify-between mb-4 p-1 text-lg lg:text-[25px]">
                                            <div className="w-[100px] lg:w-[250px]">
                                                <h2 className=" font-semibold">
                                                    Products
                                                </h2>
                                            </div>
                                            <div className="w-full flex justify-evenly">
                                                <h2 className=" font-semibold">
                                                    Price
                                                </h2>
                                                <h2 className=" font-semibold">
                                                    Quantity
                                                </h2>
                                                <h2 className=" font-semibold">
                                                    Sub-Total
                                                </h2>
                                            </div>
                                        </div>
                                        {products.map((product) => (
                                            <div
                                                key={product._id}
                                                className="flex items-center justify-between mb-4 p-1 "
                                            >
                                                <div className="w-[100px] flex flex-col lg:w-[200px]">
                                                    <div className="h-[80px] w-full relative lg:h-[180px] lg:w-[180px] lg:object-cover">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <button
                                                            className="absolute top-[-10px] right-[-10px] text-lg text-red-orange border border-transparent hover:border-red-orange"
                                                            onClick={() => {
                                                                handleShowModal();
                                                                setDeleteId(
                                                                    product._id
                                                                );
                                                                setDeleteProductName(
                                                                    product.name
                                                                );
                                                            }}
                                                        >
                                                            <AiOutlineClose />
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-semibold">
                                                        {product.name}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-evenly w-full text-lg lg:text-[25px]">
                                                    <p className="font-semibold">
                                                        &#8369; {product.price}
                                                    </p>

                                                    <div className="flex gap-3">
                                                        <button
                                                            className="p-1 border border-light hover:border-dark"
                                                            onClick={() =>
                                                                handleDecreaseQuantity(
                                                                    product._id
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineMinus />
                                                        </button>
                                                        <p className="text-light bg-red-orange px-2 rounded-sm">
                                                            {product.quantity}
                                                        </p>
                                                        <button
                                                            className="p-1 border border-light hover:border-dark"
                                                            onClick={() =>
                                                                handleIncreaseQuantity(
                                                                    product._id
                                                                )
                                                            }
                                                        >
                                                            <AiOutlinePlusCircle />
                                                        </button>
                                                    </div>

                                                    <p className="font-semibold">
                                                        &#8369;{" "}
                                                        {product.subTotal}
                                                    </p>
                                                </div>
                                                <Transition.Root
                                                    show={open}
                                                    as={Fragment}
                                                >
                                                    <Dialog
                                                        as="div"
                                                        className="relative z-10"
                                                        initialFocus={
                                                            cancelButtonRef
                                                        }
                                                        onClose={setOpen}
                                                    >
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                        </Transition.Child>

                                                        <div className="fixed inset-0 z-10 overflow-y-auto">
                                                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                <Transition.Child
                                                                    as={
                                                                        Fragment
                                                                    }
                                                                    enter="ease-out duration-300"
                                                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                                    leave="ease-in duration-200"
                                                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                                >
                                                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                            <div className="sm:flex sm:items-start">
                                                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                                    <ExclamationTriangleIcon
                                                                                        className="h-6 w-6 text-red-600"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </div>
                                                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                    <Dialog.Title
                                                                                        as="h3"
                                                                                        className="text-base font-semibold leading-6 text-gray-900"
                                                                                    >
                                                                                        Delete
                                                                                        Item
                                                                                    </Dialog.Title>
                                                                                    <div className="mt-2">
                                                                                        <p className="text-sm text-gray-500">
                                                                                            Are
                                                                                            you
                                                                                            sure
                                                                                            you
                                                                                            want
                                                                                            to
                                                                                            delete{" "}
                                                                                            {
                                                                                                deleteProductName
                                                                                            }

                                                                                            ?
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                                onClick={() => {
                                                                                    setOpen(
                                                                                        false
                                                                                    );

                                                                                    handleRemoveProduct();
                                                                                }}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                                onClick={() =>
                                                                                    setOpen(
                                                                                        false
                                                                                    )
                                                                                }
                                                                                ref={
                                                                                    cancelButtonRef
                                                                                }
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition.Root>
                                            </div>
                                        ))}
                                        <div className="w-full flex justify-center">
                                            <button
                                                className="bg-red-orange hover:bg-red-orange/75 m-5 py-2 px-4 text-light rounded-lg"
                                                onClick={handleShowClearCart}
                                            >
                                                Clear Cart
                                            </button>
                                        </div>
                                        <Transition.Root
                                            show={showClearCart}
                                            as={Fragment}
                                        >
                                            <Dialog
                                                as="div"
                                                className="relative z-10"
                                                initialFocus={cancelButtonRef}
                                                onClose={setOpen}
                                            >
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                </Transition.Child>

                                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                        >
                                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                    <div className="sm:flex sm:items-start">
                                                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                            <ExclamationTriangleIcon
                                                                                className="h-6 w-6 text-red-600"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </div>
                                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                            <Dialog.Title
                                                                                as="h3"
                                                                                className="text-base font-semibold leading-6 text-gray-900"
                                                                            >
                                                                                Clear
                                                                                Cart
                                                                            </Dialog.Title>
                                                                            <div className="mt-2">
                                                                                <p className="text-sm text-gray-500">
                                                                                    Are
                                                                                    you
                                                                                    sure
                                                                                    you
                                                                                    want
                                                                                    to
                                                                                    clear
                                                                                    cart?
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                        onClick={
                                                                            handleClearCart
                                                                        }
                                                                    >
                                                                        Clear
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                        onClick={() =>
                                                                            setShowClearCart(
                                                                                false
                                                                            )
                                                                        }
                                                                        ref={
                                                                            cancelButtonRef
                                                                        }
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </Dialog.Panel>
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </Transition.Root>
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
                                                rows={4}
                                                style={{ resize: "none" }}
                                                placeholder="Enter your note here..."
                                                value={noteValue}
                                                onChange={handleNoteChange}
                                            ></textarea>
                                            <button
                                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
                                                type="button"
                                                onClick={handleAddNote}
                                            >
                                                Add Note
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-xl font-bold my-5">
                                                No Products Yet
                                            </h1>
                                            <Link
                                                to="/user/products"
                                                className="text-light bg-red-orange px-4 py-2 rounded-md hover:bg-red-orange/75"
                                            >
                                                Add to Cart Now!
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                            {products.length > 0 && (
                                <div
                                    className={`w-full h-[460px] bg-red-orange flex flex-col items-center px-2 py-5 gap-5 text-light mb-3 sm:w-[500px] ${
                                        products.length > 0
                                            ? "sm:h-screen"
                                            : "sm:h-full"
                                    }`}
                                >
                                    <div className="w-full h-1 bg-light my-5" />
                                    <div className="h-full flex flex-col items-center justify-evenly md:h-[500px]">
                                        <div className="text-7xl">
                                            <LiaShoppingBagSolid />
                                        </div>

                                        <div className="w-full text-center">
                                            <h3 className="text-3xl">
                                                CASH TOTAL
                                            </h3>
                                            <p className="text-xl">
                                                &#8369; {total}
                                            </p>
                                        </div>

                                        <Link
                                            to="/user/checkout"
                                            className="text-dark bg-light px-4 py-2 rounded-md hover:bg-light/75"
                                        >
                                            Check-Out
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
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
            <Footer />
        </div>
    );
};

export default CartPage;
