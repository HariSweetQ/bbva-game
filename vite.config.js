import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
	root: './',
	build: {
		outDir: 'dist',
	},
	publicDir: 'public',
	plugins: [
		svgLoader(),
		VitePWA({
			registerType: 'autoUpdate',
			useCredentials: true,
			devOptions: {
				enabled: true,
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
			},
			includeAssets: ['**/*.{png}'],
			manifest: {
				name: 'BBVA Memory Cards',
				short_name: 'MemoryCards',
				description: '',
				theme_color: '#072146',
				background_color: '#072146',
				display: 'standalone',
				orientation: 'any',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: 'icons/icon-36x36.png',
						sizes: '36x36',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-48x48.png',
						sizes: '48x48',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
						purpose: 'maskable any',
					},
					{
						src: 'icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable any',
					},
				],
			},
		}),
	],
});
