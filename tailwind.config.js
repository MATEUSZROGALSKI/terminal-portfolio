/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#00FF00',
          black: '#000000',
        },
      },
      fontFamily: {
        mono: ['monospace', 'Consolas', 'Monaco', 'Courier New'],
      },
    },
  },
  plugins: [],
} 