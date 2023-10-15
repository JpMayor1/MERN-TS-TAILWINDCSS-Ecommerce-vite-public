import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID,
                currency: "PHP",
            }}
        >
            <App />
        </PayPalScriptProvider>
    </React.StrictMode>
);
