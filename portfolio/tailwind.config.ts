import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		maskImage: {
  			'custom': '#custom-mask'
  		},
  		colors: {
				'light-bg': '#F8F8F8',
  			'dark-bg': '#161616',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
				'btn-bg': '#F5F5F5',
				'btn-stroke': '#E0E0E0',
				'dark-text': '#545454',
				'light-text': '#F8F8F8',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'monitor-lines': 'repeating-linear-gradient(transparent, #00000044 0.5em)'
  		},
  		boxShadow: {
  			monitor: '5px 0 18rem #031e11',
  			'monitor-lines': '5px 5px 25px #14fdce20',
  			'monitor-shadow': 'inset 0 0 18rem black, inset 0 0 3rem black, 0 0 10rem black;'
  		},
  		keyframes: {
  			dots: {
  				'0%, 20%': {
  					content: ''
  				},
  				'40%': {
  					content: '.'
  				},
  				'60%': {
  					content: '..'
  				},
  				'80%, 100%': {
  					content: '...'
  				}
  			},
  			scroll: {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-100%)' }
  			}
  		},
  		animation: {
  			dots: 'dots 1.5s steps(3, end) infinite',
  			'scroll': 'scroll var(--speed) linear infinite backwards',
  			'spin-slow': 'spin 15s linear infinite'
  		},
  		fontSize: {
  			'12xl': '14rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
