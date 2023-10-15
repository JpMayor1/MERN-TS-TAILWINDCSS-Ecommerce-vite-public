import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useUserStore } from "../../stores/useUserStore";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalSalesGraph = () => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const [totalSales, setTotalSales] = useState<number[]>([]);

    type Order = {
        total: number;
    };

    useEffect(() => {
        fetchTotalSales();
    });

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
            setTotalSales(totalSalesData);
        } catch (error) {
            console.error("Error fetching total sales:", error);
        }
    }

    const data = {
        labels: ["Total Sales"],
        datasets: [
            {
                label: "Total Sales",
                data: [totalSales.reduce((sum, value) => sum + value, 0)],
                backgroundColor: ["rgb(255, 205, 86)"],
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

export default TotalSalesGraph;
