import { PayPalButtons } from "@paypal/react-paypal-js";
import { useUserStore } from "../../stores/useUserStore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCartStore } from "../../stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { useCheckOutInfoStore } from "../../stores/useCheckOutInfo";

type PaypalCheckoutBtnProps = {
    total: number;
};

const PaypalCheckoutBtn: React.FC<PaypalCheckoutBtnProps> = ({ total }) => {
    const API = import.meta.env.VITE_REACT_APP_API;
    const token = useUserStore((state) => state.userInfo.token);
    const products = useCartStore((state) => state.products);
    const note = useCheckOutInfoStore((state) => state.note);
    const navigate = useNavigate();
    const user = useCheckOutInfoStore((state) => state.user);
    const userInfo = useUserStore((state) => state.userInfo);
    const setUser = useCheckOutInfoStore((state) => state.setUser);

    const handleApprove = async (orderId: string) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const order = {
                paypalOrderId: orderId,
                userId: user.id,
                username: user.username,
                email: user.email,
                cpNumber: user.cpNumber,
                address: user.address,
                products: products.map((product) => ({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: product.quantity,
                    subTotal: product.subTotal,
                })),
                total: total,
                paymentMethod: "paypal",
                paid: "paid",
                note: note,
            };
            await axios
                .post(`${API}/api/orders/create`, order, config)
                .then(() => {
                    const resetUser = {
                        id: userInfo._id,
                        username: userInfo.username,
                        email: userInfo.email,
                        cpNumber: userInfo.cpNumber,
                        address: userInfo.address,
                    };
                    setUser(resetUser);
                    toast.success("Checkout Successful!");
                    setTimeout(() => {
                        navigate("/user/orders");
                    }, 2000);
                })
                .catch((err) => {
                    toast.error("Checkout Failed!");
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PayPalButtons
            style={{
                layout: "horizontal",
                shape: "rect",
                label: "paypal",
                height: 35,
            }}
            createOrder={(_data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: "Products",
                            amount: {
                                value: total.toFixed(2), // Format the total to two decimal places
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                if (actions.order) {
                    const order = await actions.order.capture();
                    console.log(order);
                    handleApprove(data.orderID);
                } else {
                    console.error("actions.order is undefined");
                }
            }}
            onCancel={() => {
                toast.error("Checkout Cancelled!");
                navigate("/user/checkout");
            }}
            onError={(err) => {
                console.log(err);
                toast.error("Checkout Failed! Please try again.");
            }}
        />
    );
};

export default PaypalCheckoutBtn;
