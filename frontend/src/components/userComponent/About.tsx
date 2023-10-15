const About = () => {
    return (
        <div className="min-h-[250px] h-full w-screen bg-red-orange flex justify-center items-center">
            <div className="max-w-[1200px] w-full h-full flex flex-col sm:flex-row items-center justify-center p-5">
                <div className="w-full h-[300px] flex flex-col text-light items-start justify-center px-5 gap-2">
                    <h1 className="text-xl font-bold sm:text-[35px] xl:text-[40px]">Abous Us</h1>
                    <p className="text-base sm:text-lg xl:text-xl">
                        SliceBite Pizzeria is a dynamic and innovative pizza
                        company that takes the art of pizza-making to new
                        heights. With a passion for flavor and a commitment to
                        quality, SliceBite offers a diverse menu of handcrafted
                        pizzas that cater to a wide range of tastes.
                    </p>
                </div>
                <div className="w-full h-[250px] bg-[url(../../../assets/pizza7.jpg)] bg-cover overflow-hidden flex justify-evenly items-center rounded-xl mx-5">
                    <div className="h-full w-[20px] bg-red-orange" />
                    <div className="h-full w-[20px] bg-red-orange" />
                </div>
            </div>
        </div>
    );
};

export default About;
