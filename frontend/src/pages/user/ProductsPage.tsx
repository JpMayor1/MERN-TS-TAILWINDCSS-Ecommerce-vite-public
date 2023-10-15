import Footer from "../../components/userComponent/Footer";
import UserNav from "../../components/userComponent/UserNav";
import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUserStore } from "../../stores/useUserStore";
import { ProductType } from "../../utils/types";
import { toast, Toaster } from "react-hot-toast";

const ProductsPage = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductType[]>([]);
    const UserId = useUserStore((state) => state.userInfo._id);

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

    const handleAddProduct = async (
        name: string,
        image: string,
        price: number
    ) => {
        const product = {
            userId: UserId,
            name: name,
            image: image,
            price: price,
            quantity: 1,
            subTotal: price,
        };
        // Add to cart
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios
            .post(`${API}/api/cart/add`, product, config)
            .then(() => {
                toast.success("Added to cart");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong");
            });
    };

    return (
        <div className="font-[sans-serif] text-base w-screen h-full overflow-hidden">
            <UserNav />
            <div className="w-full h-full flex flex-col items-center justify-start pt-20 overflow-y-scroll">
                <div className="bg-red-orange w-fit py-2 px-4 text-light rounded-lg">
                    <h1 className="text-lg sm:text-xl">Menu Pizza</h1>
                </div>
                <div className="w-full h-full">
                    {isLoading && (
                        <div className="h-screen w-full flex justify-center items-center">
                            <ClipLoader size={100} color="black" />
                        </div>
                    )}
                    {products.length === 0 ? (
                        <div className="h-full w-full text-center">
                            <h1>No Products yet</h1>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-2xl px-4 pb-5 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-2">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:gap-x-8">
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="group relative shadow-xl drop-shadow-md p-3"
                                    >
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between px-2 py-1">
                                            <p className="text-base text-red-orange font-bold">
                                                Stock: {product.countInStock}
                                            </p>
                                            <p className="text-base text-red-orange font-bold">
                                                &#8369; {product.price}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="text-light text-lg flex items-center bg-red-orange w-full py-1 px-3 sm:py-2 sm:px-4 sm:text-xl">
                                                <p>{product.name}</p>
                                            </div>

                                            <div>
                                                <button
                                                    className="bg-green-dark text-green-light py-[10px] px-3 sm:py-[7px] sm:text-3xl sm:px-4 "
                                                    onClick={() =>
                                                        handleAddProduct(
                                                            product.name,
                                                            product.image,
                                                            product.price
                                                        )
                                                    }
                                                >
                                                    <AiOutlineShoppingCart />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
        </div>
    );
};

export default ProductsPage;
