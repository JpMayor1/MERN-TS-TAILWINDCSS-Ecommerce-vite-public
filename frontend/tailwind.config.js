/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#03001C",
                light: "#F5F5F5",
                gray: "#61677A",
                "bg-light": "#E0E0E0",
                "green-dark": "#1A5D1A",
                "green-light": "#CBFFA9",
                "red-orange": "#C70039",
                footer: "#047A7D",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
