// import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const TotalSales = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [totalSales, setTotalSales] = useState(0);

    type Order = {
        total: number;
    };

    useEffect(() => {
        async function fetchTotalSales() {
            try {
                const response = await axios.get(`${API}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const totalSalesData = response.data.map(
                    (order: Order) => order.total
                );
                const calculatedTotalSales = totalSalesData.reduce(
                    (sum: number, value: number) => sum + value,
                    0
                );
                setTotalSales(calculatedTotalSales);
            } catch (error) {
                console.error("Error fetching total sales:", error);
            }
        }
        fetchTotalSales();
    }, [API, token]);

    return (
        <div className="bg-light max-h-[100px] h-full max-w-[250px] w-full py-10 flex gap-2 items-center justify-center rounded-md drop-shadow">
            <div>
                <svg
                    viewBox="0 0 384 512"
                    fill="currentColor"
                    height="64px"
                    width="64px"
                >
                    <path d="M64 32c-17.7 0-32 14.3-32 32v64c-17.7 0-32 14.3-32 32s14.3 32 32 32v32c-17.7 0-32 14.3-32 32s14.3 32 32 32v160c0 17.7 14.3 32 32 32s32-14.3 32-32v-64h80c68.4 0 127.7-39 156.8-96H352c17.7 0 32-14.3 32-32s-14.3-32-32-32h-.7c.5-5.3.7-10.6.7-16s-.2-10.7-.7-16h.7c17.7 0 32-14.3 32-32s-14.3-32-32-32h-19.2C303.7 71 244.4 32 176 32H64zm190.4 96H96V96h80c30.5 0 58.2 12.2 78.4 32zM96 192h190.9c.7 5.2 1.1 10.6 1.1 16s-.4 10.8-1.1 16H96v-32zm158.4 96c-20.2 19.8-47.9 32-78.4 32H96v-32h158.4z" />
                </svg>
            </div>
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-green-dark text-lg">Total Sales</h2>
                <b className="text-red-orange text-base">
                    <i>{totalSales}</i>
                </b>
            </div>
        </div>
    );
};

export default TotalSales;
