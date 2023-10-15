import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const UserRoute: React.FC = () => {
    const token = useUserStore((state) => state.userInfo.token);

    if (!token) {
        // Redirect to a different route if not an admin
        return <Navigate to="/auth/login" />;
    }

    return <Outlet />;
};

export default UserRoute;
