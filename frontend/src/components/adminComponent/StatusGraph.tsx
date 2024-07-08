import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusGraph = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);

    useEffect(() => {
        const fetchTotalOrders = async () => {
            try {
                const response = await axios.get(`${API}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTotalOrders(response.data.length);
            } catch (error) {
                console.error("Error fetching total orders:", error);
            }
        };

        const fetchTotalProducts = async () => {
            try {
                const response = await axios.get(`${API}/api/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTotalProducts(response.data.length);
            } catch (error) {
                console.error("Error fetching total products:", error);
            }
        };

        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get(`${API}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTotalUsers(response.data.length);
            } catch (error) {
                console.error("Error fetching total users:", error);
            }
        };

        fetchTotalOrders();
        fetchTotalProducts();
        fetchTotalUsers();
    }, [API, token]);

    const data = {
        labels: ["Total Orders", "Total Products", "Total Users"],
        datasets: [
            {
                label: "Totals",
                data: [totalOrders, totalProducts, totalUsers],
                backgroundColor: [
                    "rgb(75, 192, 192)",
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                ],
            },
        ],
    };

    const options = {
        responsive: true, // Allow responsiveness
    };

    return (
        <div>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <Doughnut data={data} options={options}></Doughnut>
            </div>
        </div>
    );
};

export default StatusGraph;
