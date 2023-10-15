import { AiOutlineCopyright } from "react-icons/ai";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="h-[100px] w-full bg-footer text-light py-3 sm:relative">
            <div className="max-[639px]:w-full max-[639px]:text-base max-[639px]:mb-2 flex items-center justify-center gap-2 sm:text-xl sm:absolute sm:inset-0 ">
                <AiOutlineCopyright /> <p>All rights reserved</p>
            </div>
            <div className="max-[639px]:w-full text-base flex items-center justify-center sm:w-fit sm:h-fit  sm:absolute sm:right-5 sm:top-[30px] ">
                <div className="max-[639px]:text-lg max-[350px]:w-[150px] border-t border-b border-light flex gap-8  py-3 w-[200px]  items-center justify-center sm:text-xl ">
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
    );
};

export default Footer;
