import { build, defineConfig } from 'vite'

export default defineConfig({
    base: "/Ijazat-list/",
    build: {
        assetsInlineLimit: 0,
        emptyOutDir: true,
        rollupOptions: {

        }
    }
})