import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				DEFAULT: '#FCA311'
  			},
  			navy: '#14213D',
  			grey: '#E5E5E5',
  			light: {
  				'100': '#F5F5F5',
  				'200': '#D6D6D6',
  				'300': '#C2C2C2',
  				'400': '#8F8F8F',
  				'500': '#7A7A7A'
  			},
  			dark: {
  				'100': '#28427B',
  				'200': '#1E325C',
  				'300': '#0F192E',
  				'400': '#0A111F'
  			}
  		},
		boxShadow: {
			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'caret-blink': {
				'0%,70%,100%': {
					opacity: '1'
				},
				'20%,50%': {
					opacity: '0'
				}
			}
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
