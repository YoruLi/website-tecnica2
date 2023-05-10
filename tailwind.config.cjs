/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                telegraf: ["Telegraf", ...fontFamily.sans],
            },
            animation: {
                "moving-background": "moving-background 5s ease-in-out",
            },
            keyframes: {
                "moving-background": {
                    "0%": {
                        transform: "translateY(0)",
                        opacity: 0,
                    },
                    "66%": {
                        opacity: 0.4,
                    },
                    "100%": {
                        transform: "translateY(-150px)",
                        opacity: 0,
                    },
                },
            },
        },
    },
    plugins: [],
};
