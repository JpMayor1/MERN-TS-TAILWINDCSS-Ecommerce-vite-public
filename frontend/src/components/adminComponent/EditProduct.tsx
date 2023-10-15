import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { useProductStore } from "../../stores/useProductStore";

type ProductTYpe = {
    id: string;
    publicId: string;
    name: string;
    price: number | string;
    countInStock: number | string;
    image: string;
    toggleEditModal: () => void;
};
const EditProduct = ({
    id,
    publicId,
    name,
    price,
    image,
    countInStock,
    toggleEditModal,
}: ProductTYpe) => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [productName, setProductName] = useState(name);
    const [productPrice, setProductPrice] = useState(price);
    const [productCountInStock, setProductCountInStock] =
        useState(countInStock);
    const [productImage, setProductImage] = useState(image);
    const [isLoading, setIsLoading] = useState(false);
    const addProduct = useProductStore((state) => state.addProduct);
    const removeProduct = useProductStore((state) => state.removeProduct);

    const convertBase64 = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (
        event: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const file = event.target.files;

        if (!file) {
            setProductImage(image);
            return;
        }

        const base64 = await convertBase64(file[0]);
        setProductImage(base64);
        return;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            removeProduct(id);
            if (productImage !== image) {
                await axios
                    .delete(`${API}/api/delete/${publicId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        console.log(err);
                    });

                await axios
                    .post(
                        `${API}/api/upload`,
                        { image: productImage },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        // Update product
                        const newProduct = {
                            name: productName,
                            price: parseFloat(Number(productPrice).toFixed(2)),
                            countInStock: parseInt(
                                Number(productCountInStock).toFixed(2)
                            ),
                            image: res.data.imageUrl,
                            publicId: res.data.publicId,
                        };

                        axios
                            .put(
                                `${API}/api/products/update/${id}`,
                                newProduct,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                            .then((res) => {
                                console.log(res.data.updatedProduct);
                                addProduct(res.data.updatedProduct);
                                toast.success("Product created successfully");
                                setIsLoading(false);
                                toggleEditModal();
                            })
                            .catch((err) => {
                                console.log(err);
                                toast.error(
                                    "An error occurred while creating the product"
                                );
                                setIsLoading(false);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false);
                    });
            } else {
                const newProduct = {
                    name: productName,
                    price: parseFloat(Number(productPrice).toFixed(2)),
                    countInStock: parseInt(
                        Number(productCountInStock).toFixed(2)
                    ),
                    image,
                    publicId,
                };

                axios
                    .put(`${API}/api/products/update/${id}`, newProduct, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        console.log(res.data.updatedProduct);
                        addProduct(res.data.updatedProduct);
                        toast.success("Product created successfully");
                        setIsLoading(false);
                        toggleEditModal();
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error(
                            "An error occurred while creating the product"
                        );
                        setIsLoading(false);
                    });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("An error occurred while updating the product");
        }
    };

    return (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-2">Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex items-start justify-center gap-3">
                    <div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                value={productPrice}
                                onChange={(e) =>
                                    setProductPrice(e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Count in Stock
                            </label>
                            <input
                                type="number"
                                value={productCountInStock}
                                onChange={(e) =>
                                    setProductCountInStock(e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col flex-start">
                        <div className="mb-3">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-[225px] border-gray-300 border rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                {productImage ? (
                                    <img
                                        src={productImage}
                                        alt="product"
                                        className="w-full h-[225px] object-cover rounded-lg shadow"
                                    />
                                ) : (
                                    <div className="flex flex-col flex-wrap items-center justify-center p-3">
                                        <svg
                                            aria-hidden="true"
                                            className="w-10 h-10 mb-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG up to 20MB
                                        </p>
                                    </div>
                                )}

                                <input
                                    onChange={uploadImage}
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    multiple
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow focus:outline-none focus:ring focus:ring-blue-300 w-full"
                >
                    {isLoading ? (
                        <BeatLoader size={8} color="white" />
                    ) : (
                        "Update Product"
                    )}
                </button>
            </form>
            <button
                onClick={toggleEditModal}
                className="bg-red-orange hover:bg-red-orange/75 text-white px-4 py-2 rounded shadow focus:outline-none focus:ring focus:ring-blue-300 w-full mt-2"
            >
                Cancel
            </button>
        </div>
    );
};

export default EditProduct;
