import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const TotalOrders = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchTotalOrders = async () => {
            await axios
                .get(`${API}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setTotalOrders(res.data.length);
                });
        };
        fetchTotalOrders();
    }, [totalOrders, API, token]);

    return (
        <div className="bg-light max-h-[100px] h-full max-w-[250px] w-full py-10 flex gap-2 items-center justify-center rounded-md drop-shadow">
            <div>
                <ShoppingCartIcon className="w-16 h-16" aria-hidden="true" />
            </div>
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-green-dark text-lg">Total Orders</h2>
                <b className="text-red-orange text-base">
                    <i>{totalOrders}</i>
                </b>
            </div>
        </div>
    );
};

export default TotalOrders;
