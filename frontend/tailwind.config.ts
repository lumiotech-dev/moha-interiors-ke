import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Brand Kit Integration
                charcoal: {
                    DEFAULT: '#222831',
                    light: '#3A4750',
                    dark: '#1a1f26', // Ultra dark for luxury
                },
                offWhite: '#F9F7F7',
                mutedGold: '#C0A06F',
                coolGrey: '#DBE2EF',
                warmGrey: '#3F72AF',
            },
            fontFamily: {
                playfair: ['var(--font-playfair)', 'serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
