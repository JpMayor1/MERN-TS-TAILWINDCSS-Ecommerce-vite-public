import AdminOrders from "../../components/adminComponent/AdminOrders";
import AdminProducts from "../../components/adminComponent/AdminProducts";
import Dashboard from "../../components/adminComponent/Dashboard";
import Heading from "../../components/adminComponent/Heading";
import { Sidebar } from "../../components/adminComponent/SideBar";
import AdminUsers from "../../components/adminComponent/AdminUsers";
import { useLinkStore } from "../../stores/useLinkStore";
import { Toaster } from "react-hot-toast";

const AdminHome = () => {
    const links = useLinkStore((state) => state.links);

    return (
        <div className="flex h-screen w-screen font-[sans-serif] text-base">
            <div>
                <Sidebar />
            </div>
            <div className="w-full overflow-hidden bg-bg-light transition-all">
                <Heading />
                {links.dashboard && <Dashboard />}
                {links.products && <AdminProducts />}
                {links.orders && <AdminOrders />}
                {links.users && <AdminUsers />}
            </div>
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

export default AdminHome;
