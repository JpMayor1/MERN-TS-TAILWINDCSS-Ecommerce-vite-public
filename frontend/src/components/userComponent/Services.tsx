import { FiTruck, FiShoppingBag } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Services = () => {
    return (
        <div className="h-fit w-full flex items-center justify-center py-5">
            <div className="max-w-[1200px] w-full h-full flex flex-col gap-3 items-center">
                <h1 className="text-xl font-bold sm:text-[35px] xl:text-[40px] sm:mt-10">
                    Our Services
                </h1>
                <div className="flex w-full h-full justify-evenly items-center sm:mt-11 gap-2 p-5">
                    <div className="border border-dark flex items-center justify-center flex-col gap-3 shadow-xl h-[100px] w-[100px] text-lg sm:h-[150px] sm:w-[150px] sm:text-2xl lg:h-[250px] lg:w-[250px] hover:scale-[1.05] transition-all">
                        <FiTruck />
                        <h2>Delivery</h2>
                    </div>
                    <div className="border border-dark flex items-center justify-center flex-col gap-3 shadow-xl h-[100px] w-[100px] text-lg sm:h-[150px] sm:w-[150px] sm:text-2xl lg:h-[250px] lg:w-[250px] hover:scale-[1.05] transition-all">
                        <FiShoppingBag />
                        <h2>Take-out</h2>
                    </div>
                    <div className="border border-dark flex items-center justify-center flex-col gap-3 shadow-xl h-[100px] w-[100px] text-lg sm:h-[150px] sm:w-[150px] sm:text-2xl lg:h-[250px] lg:w-[250px] hover:scale-[1.05] transition-all">
                        <MdOutlineRestaurantMenu />
                        <h2>Dine-in</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
