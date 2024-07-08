const Informations = () => {
    return (
        <div className="h-[500px] w-full flex justify-center items-center max-[639px]:my-8 sm:my-[100px]">
            <div className="max-w-[1200px] h-full w-full bg-red-orange">
                <div className="relative h-full w-full">
                    <div className="h-full w-full flex text-light max-[639px]:flex-col sm:flex-row p-5 gap-2 items-center justify-center">
                        <img
                            src="/assets/bg.jpg"
                            alt="bg"
                            className="brightness-50 absolute inset-0 h-full w-full object-cover mx-auto"
                        />

                        <div className="max-[639px]:w-full max-[639px]:h-1/2 sm:w-1/2 flex flex-col items-start justify-center gap-3 z-10">
                            <div className="flex items-center justify-center">
                                <div>
                                    <img
                                        src="/assets/info-icon.png"
                                        alt="icon"
                                        className="max-[639px]:h-16 max-[639px]:w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="max-[639px]:text-lg font-bold sm:text-3xl lg:text-5xl">
                                        Location
                                    </h1>
                                    <p className="max-[639px]:text-base sm:text-xl lg:text-2xl">
                                        Street, Municipality, City
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div>
                                    <img
                                        src="/assets/info-icon.png"
                                        alt="icon"
                                        className="max-[639px]:h-16 max-[639px]:w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="max-[639px]:text-lg font-bold sm:text-3xl lg:text-5xl mt-2">
                                        Contact
                                    </h1>
                                    <p className="max-[639px]:text-base sm:text-xl lg:text-2xl">
                                        09090909090
                                    </p>
                                    <p className="max-[639px]:text-base sm:text-xl lg:text-2xl">
                                        example@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="max-[639px]:w-full max-[639px]:h-1/2 sm:w-1/2 flex flex-col items-start justify-center gap-3 z-10">
                            <div className="flex items-center justify-center">
                                <div>
                                    <img
                                        src="/assets/info-icon.png"
                                        alt="icon"
                                        className="max-[639px]:h-16 max-[639px]:w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="max-[639px]:text-lg font-bold sm:text-3xl lg:text-5xl">
                                        We're Open
                                    </h1>
                                    <p className="max-[639px]:text-base sm:text-xl lg:text-2xl">
                                        8:30am - 9:30pm
                                    </p>
                                    <p className="max-[639px]:text-base sm:text-xl lg:text-2xl">
                                        Monday - Saturday
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div>
                                    <img
                                        src="/assets/info-icon.png"
                                        alt="icon"
                                        className="max-[639px]:h-16 max-[639px]:w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="max-[639px]:text-lg font-bold sm:text-3xl lg:text-5xl mt-2">
                                        We're Closed
                                    </h1>
                                    <p className="max-[639px]:text-base sm:text-xl lg:text-2xl">
                                        Sunday
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Informations;
