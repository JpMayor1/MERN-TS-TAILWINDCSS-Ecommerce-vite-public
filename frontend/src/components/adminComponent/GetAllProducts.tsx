import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import { useProductStore } from "../../stores/useProductStore";
import EditProduct from "./EditProduct";

const GetAllProducts = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [isLoading, setIsLoading] = useState(false);
    const [iseDeleting, setIsDeleting] = useState(false);
    const setProducts = useProductStore((state) => state.setProducts);
    const products = useProductStore((state) => state.products);
    const removeProduct = useProductStore((state) => state.removeProduct);
    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const [id, setId] = useState("");
    const [publicId, setPublicId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState("");

    const handleEditProduct = (
        id: string,
        publicId: string,
        name: string,
        price: number,
        countInStock: number,
        image: string
    ) => {
        setShowEditProductModal(!showEditProductModal);

        setId(id);

        setPublicId(publicId);

        setName(name);

        setPrice(price);

        setCountInStock(countInStock);

        setImage(image);
    };

    const toggleEditModal = () => {
        setShowEditProductModal(!showEditProductModal);
    };

    useEffect(() => {
        setIsLoading(true);
        const getAllProducts = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios
                .get(`${API}/api/products`, config)
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        };

        getAllProducts();
    }, [token, API, setProducts]);

    const deleteProduct = async (id: string, publicId: string) => {
        setIsDeleting(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios
            .delete(`${API}/api/delete/${publicId}`, config)
            .then(() => setIsDeleting(false))
            .catch((error) => {
                console.log(error);
                setIsDeleting(false);
            });
        await axios
            .delete(`${API}/api/products/delete/${id}`, config)
            .then((res) => {
                console.log(res.data);
                toast.success("Product deleted successfully!");
                setIsDeleting(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong!");
                setIsDeleting(false);
            });
        removeProduct(id);
        setIsDeleting(false);
    };

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <BeatLoader size={8} color="black" />
            </div>
        );
    } else {
        return (
            <>
                <div className="bg-light">
                    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
                            {products.length === 0 ? (
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-lg font-medium text-gray-900">
                                        No products found!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {iseDeleting ? (
                                        <ClipLoader size={50} color="#03001C" />
                                    ) : (
                                        <>
                                            {products.map((product) => (
                                                <div
                                                    key={product._id}
                                                    className="group shadow-md p-2 bg-white"
                                                >
                                                    <div className="aspect-h-1 aspect-w-1 w-full  rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                        {product.image ? (
                                                            <img
                                                                src={
                                                                    product.image
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
                                                                No Image or
                                                                Image Deleted
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h3 className="mt-4 text-sm text-gray-700">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center justify-between">
                                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                                            &#8369;{" "}
                                                            {product.price}
                                                        </p>
                                                        <p>
                                                            Stock:{" "}
                                                            <span>
                                                                {
                                                                    product.countInStock
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="w-full flex items-center justify-between">
                                                        <button
                                                            onClick={() =>
                                                                handleEditProduct(
                                                                    product._id,
                                                                    product.publicId,
                                                                    product.name,
                                                                    product.price,
                                                                    product.countInStock,
                                                                    product.image
                                                                )
                                                            }
                                                            className="bg-green-dark text-light px-6 py-1 rounded-lg mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    product._id,
                                                                    product.publicId
                                                                )
                                                            }
                                                            className="bg-red-orange text-light px-4 py-1 rounded-lg ml-2"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}

                            <div className="max-w-[550px] w-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 p-2">
                                {showEditProductModal && (
                                    <EditProduct
                                        id={id}
                                        publicId={publicId}
                                        name={name}
                                        price={price}
                                        countInStock={countInStock}
                                        image={image}
                                        toggleEditModal={toggleEditModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default GetAllProducts;
