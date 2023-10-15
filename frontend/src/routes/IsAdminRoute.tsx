import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const IsAdminRoute: React.FC = () => {
    const isAdmin = useUserStore((state) => state.userInfo.isAdmin);

    if (isAdmin) {
        // Redirect to a different route if not an admin
        return <Navigate to="/admin" />;
    }

    return <Outlet />;
};

export default IsAdminRoute;
