/* eslint-disable no-undef */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",

        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                vita: "#E31F1C",
                nav: "#E84B4A",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
}
