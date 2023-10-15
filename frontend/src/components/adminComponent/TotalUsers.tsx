import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const TotalUsers = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            await axios
                .get(`${API}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setTotalUsers(res.data.length);
                });
        };
        fetchTotalUsers();
    }, [totalUsers, API, token]);

    return (
        <div className="bg-light max-h-[100px] h-full max-w-[250px] w-full py-10 flex gap-2 items-center justify-center rounded-md drop-shadow">
            <div>
                <UserCircleIcon
                    className="w-16 h-16"
                    aria-hidden="true"
                />
            </div>
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-green-dark text-lg">Total Users</h2>
                <b className="text-red-orange text-base">
                    <i>{totalUsers}</i>
                </b>
            </div>
        </div>
    );
};

export default TotalUsers;
