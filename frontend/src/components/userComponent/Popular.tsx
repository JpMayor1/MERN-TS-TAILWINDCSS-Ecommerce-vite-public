import { Link } from "react-router-dom";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const Popular = () => {
    return (
        <div className="h-fit w-full flex items-center justify-center py-5">
            <div className="max-w-[1200px] w-full h-full flex flex-col gap-3 items-center">
                <h1 className="text-xl font-bold sm:text-[35px] xl:text-[40px] sm:mt-10">
                    Popular
                </h1>
                <div className="flex w-full justify-evenly items-center sm:mt-11 gap-2 p-5">
                    <img
                        src="/assets/pizza2.jpg"
                        alt="pizza2"
                        className="max-h-[200px] max-w-[200px] min-h-[30px] min-w-[30px] h-full w-full  object-cover overflow-hidden rounded-full bg-center drop-shadow-2xl"
                    />

                    <img
                        src="/assets/pizza1.jpg"
                        alt="pizza1"
                        className="max-h-[200px] max-w-[200px] min-h-[30px] min-w-[30px] h-full w-full  object-cover overflow-hidden rounded-full bg-center drop-shadow-2xl"
                    />

                    <img
                        src="/assets/pizza6.gif"
                        alt="pizza6"
                        className="max-h-[200px] max-w-[200px] min-h-[30px] min-w-[30px] h-full w-full object-cover overflow-hidden rounded-full bg-center drop-shadow-2xl"
                    />
                </div>
                <div className="w-full flex justify-end mr-4">
                    <Link
                        to={`/user/products`}
                        className="text-red-orange flex items-center gap-3"
                    >
                        View All Products{" "}
                        <span className="text-[50px]">
                            <LiaLongArrowAltRightSolid />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Popular;
