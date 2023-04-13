/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'primary': '#f96162',
                'secondary': '#ff738f',
                'error': '#ef4444',
                'success': '#4ade80',
            },
        },
    },
    plugins: [],
}