import CreateProduct from "./CreateProduct";
import GetAllProducts from "./GetAllProducts";
import { useState } from "react";

const AdminProducts = () => {
    const [showProducts, setShowProducts] = useState(true);
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    const handleShowProducts = () => {
        setShowProducts(true);
        setShowCreateProduct(false);
    };

    const handleShowCreateProduct = () => {
        setShowProducts(false);
        setShowCreateProduct(true);
    };

    return (
        <div className="h-full w-full flex items-center justify-center">
          
            <div className="h-[90%] w-[90%] pb-[100px] overflow-y-scroll bg-light flex flex-col items-center">
            <h1 className="text-center text-2xl font-bold mt-2">Products</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 my-2 rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={handleShowCreateProduct}
                >
                    Create Products
                </button>
                <div className="flex flex-col items-center justify-center w-full">
                    {showProducts && <GetAllProducts />}
                    {showCreateProduct && (
                        <CreateProduct toggleCreateModal={handleShowProducts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
