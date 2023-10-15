import { Link } from "react-router-dom";
import { BsInstagram, BsFacebook } from "react-icons/bs";

const Hero = () => {
    return (
        <div className="w-full h-screen flex justify-center items-start overflow-hidden">
            <div className="max-w-[1200px] h-[90%] w-[90%] relative">
                <div className="w-1/2 max-[420px]:w-full h-full flex flex-col justify-center items-start max-[639px]:gap-3 max-[450px]:gap-1">
                    <h1 className="font-semibold z-20 max-[639px]:text-[30px] max-[639px]:leading-[30px] max-[639px]:mt-28 sm:text-[40px] sm:leading-[40px] lg:text-[50px] lg:leading-[50px]">
                        Hand made{" "}
                        <span className="block">
                            with an extra pinch of{" "}
                            <span className="text-red-orange">LOVE</span>
                        </span>
                    </h1>
                    <p className="z-20 my-3 max-[639px]:text-sm max-[639px]:leading-[20px] sm:text-base lg:text-lg">
                        In the modern age, online pizza delivery is the ultimate
                        convenience. With a few taps or clicks, you can have
                        your favorite pizza delivered straight to your door,
                        making satisfying your pizza cravings easier than ever.
                    </p>
                    <div className="relative w-full h-fit mt-7 z-20">
                        <div className="absolute bg-[url(/assets/icon1.png)] z-10 bg-cover overflow-hidden max-[639px]:top-[-30px] max-[639px]:left-[-25px] max-[639px]:h-[60px] max-[639px]:w-[60px] sm:top-[-40px] sm:left-[-30px] sm:h-[70px] sm:w-[70px]"></div>
                        <Link
                            to="/user/products"
                            className="border border-red-orange absolute top-0 left-0 hover:bg-red-orange hover:text-light transition-all duration-150 ease-in-out max-[639px]:text-[18px] max-[639px]:py-2 max-[639px]:px-3 sm:text-lg sm:py-2 sm:px-4 xl:text-xl xl:py-3 xl:px-5"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>

                <div className="max-[639px]:hidden bg-[url(/assets/icon2.png)] bg-center bg-cover rounded-full overflow-hidden sm:absolute sm:w-[96px] sm:h-[96px] sm:top-[120px] sm:left-[270px] md:top-[100px] md:left-[450px] lg:left-[500px] lg:top-[70px] xl:top-[100px]"></div>

                <div className="absolute bg-[url(/assets/pizza5.jpg)] rounded-full bg-cover overflow-hidden  bg-center rotate-90 z-10 max-[639px]:h-[400px] max-[639px]:w-[400px] max-[639px]:right-[-170px] max-[639px]:top-[-170px] sm:h-[500px] sm:w-[500px] sm:top-[-200px] sm:right-[-200px] lg:h-[600px] lg:w-[600px] xl:h-[700px] xl:w-[700px] sm:hover:top-[-150px] sm:hover:right-[-150px] transition-all"></div>

                <div className="absolute rounded-full bg-red-orange max-[639px]:h-[400px] max-[639px]:w-[400px] max-[639px]:right-[-150px] max-[639px]:top-[-150px] sm:h-[500px] sm:w-[500px] sm:top-[-180px] sm:right-[-180px] lg:h-[600px] lg:w-[600px] xl:h-[700px] xl:w-[700px] xl:top-[-150px] xl:right-[-150px]"></div>

                <div className="absolute rotate-[150deg] rounded-full bg-cover overflow-hidden bg-[url(/assets/pizza6.gif)] bg-center max-[639px]:h-[200px] max-[639px]:w-[200px] max-[639px]:left-[-100px] max-[639px]:bottom-[-150px] sm:h-[200px] sm:w-[200px] sm:left-[-100px] sm:bottom-[-150px] xl:bottom-[-220px] xl:left-[-80px] xl:h-[300px] xl:w-[300px] hover:rotate-180 transition-all"></div>

                <div className="absolute bottom-[-50px] right-0 ">
                    <div className="flex text-[30px] text-dark gap-8 border-t border-b border-dark py-3 w-[200px] max-[350px]:w-[150px] items-center justify-center">
                        <Link
                            to="https://facebook.com"
                            target="_blank"
                            className="hover:text-red-orange"
                        >
                            <BsFacebook />
                        </Link>
                        <Link
                            to="https://instagram.com"
                            target="_blank"
                            className="hover:text-red-orange"
                        >
                            <BsInstagram />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
