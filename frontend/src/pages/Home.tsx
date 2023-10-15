import About from "../components/userComponent/About";
import Footer from "../components/userComponent/Footer";
import Hero from "../components/userComponent/Hero";
import Informations from "../components/userComponent/Informations";
import Popular from "../components/userComponent/Popular";
import Services from "../components/userComponent/Services";
import UserNav from "../components/userComponent/UserNav";

const Home = () => {
    return (
        <div className="font-[sans-serif] text-base w-screen h-full bg-light">
            <UserNav />
            <Hero />
            <About />
            <Popular />
            <Services />
            <Informations />
            <Footer />
        </div>
    );
};

export default Home;
