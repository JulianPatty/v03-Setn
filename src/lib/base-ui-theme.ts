// Base UI theme configuration
// Base UI components use CSS variables and utility classes for theming

export const baseUIConfig = {
	// Base UI components will use our existing CSS variables
	// We'll map our design tokens to Base UI's expected class names
	variants: {
		button: {
			primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
		},
		size: {
			sm: 'h-9 px-3 text-sm',
			md: 'h-10 px-4',
			lg: 'h-11 px-8',
			icon: 'h-10 w-10',
		},
	},
};

// Helper function to generate Base UI compatible class names
export function getBaseUIClasses(component: string, variant?: string, size?: string) {
	const classes = [];
	
	if (component === 'button') {
		classes.push('inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50');
		
		if (variant && baseUIConfig.variants.button[variant as keyof typeof baseUIConfig.variants.button]) {
			classes.push(baseUIConfig.variants.button[variant as keyof typeof baseUIConfig.variants.button]);
		}
		
		if (size && baseUIConfig.variants.size[size as keyof typeof baseUIConfig.variants.size]) {
			classes.push(baseUIConfig.variants.size[size as keyof typeof baseUIConfig.variants.size]);
		}
	}
	
	return classes.join(' ');
}