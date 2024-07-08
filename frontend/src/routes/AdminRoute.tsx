import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { Sidebar } from "../components/adminComponent/SideBar";
import Heading from "../components/adminComponent/Heading";

const AdminRoute: React.FC = () => {
    const isAdmin = useUserStore((state) => state.userInfo.isAdmin);

    if (!isAdmin) {
        // Redirect to a different route if not an admin
        return <Navigate to="/" />;
    }

    return (
        <div className="flex h-screen w-screen font-[sans-serif] text-base">
            <div>
                <Sidebar />
            </div>
            <div className="w-full overflow-hidden bg-bg-light transition-all">
                <Heading />
                <Outlet />
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

export default AdminRoute;
