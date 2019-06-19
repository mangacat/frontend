module.exports = {
	theme: {
		extend: {
			screens: {
				dark: {
					raw: '(prefers-color-scheme: dark)'
				}
			},
			maxWidth: {
				'9xl': '96rem'
			},
			height: {
				80: '20rem',
				104: '26rem',
				128: '32rem'
			},
			zIndex: {
				90: '90',
				100: '100'
			}
		}
	},
	variants: {
		height: ['responsive', 'hover'],
		margin: ['responsive', 'hover'],
		padding: ['responsive', 'first-child'],
		opacity: ['responsive', 'hover']
	},
	plugins: [
		require('@tailwindcss/custom-forms'),
		function({ addVariant, e }) {
			addVariant('first-child', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`first-child${separator}${className}`)}:first-child`
				})
			})
		}
	]
}
