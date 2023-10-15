import TotalOrders from "./TotalOrders";
import TotalProducts from "./TotalProducts";
import StatusGraph from "./StatusGraph";
import TotalUsers from "./TotalUsers";
import TotalSalesGraph from "./TotalSalesGraph";
import TotalSales from "./TotalSales";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center h-full w-full overflow-y-scroll max-[540px]:pb-20 ">
            <h1 className="text-center text-2xl font-bold m-3">Dashboard</h1>
            <div className="flex gap-2 max-w-[1300px] w-full items-center justify-evenly mt-3 px-2 flex-wrap">
                <TotalSales />
                <TotalOrders />
                <TotalProducts />
                <TotalUsers />
            </div>
            <div className="flex gap-3 flex-wrap items-center justify-center mt-3 bg-light p-1 rounded-xl m-2">
                <TotalSalesGraph />
                <StatusGraph />
            </div>
        </div>
    );
};

export default Dashboard;
