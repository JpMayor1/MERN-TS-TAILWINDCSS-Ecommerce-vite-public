import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const IsAuth: React.FC = () => {
    const token = useUserStore((state) => state.userInfo.token);
    const isAdmin = useUserStore((state) => state.userInfo.isAdmin);

    if (token) {
        if (isAdmin) {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/" />;
        }
    }

    return <Outlet />;
};

export default IsAuth;
