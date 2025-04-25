import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#FFFFFF',
                    dark: '#000000',
                },
                foreground: {
                    DEFAULT: '#000000',
                    dark: '#FFFFFF',
                },
                secondary: '#942941',
                highlight: {
                    DEFAULT: '#F0F8FF',
                    dark: '#313131',
                },
                border: {
                    DEFAULT: '#E5E5E5',
                    dark: 'rgba(255, 255, 255, 0.1)',
                },
            },
            fontFamily: {
                sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

export default config