import { defineConfig, PluginOption } from 'vite'
import { htmlBuildPlugin, srcFilePaths } from './buildTimeScripts/buildMain'

export default defineConfig({
    root: "src",
    base: "/Ijazat-list/",
    publicDir: "../public",
    build: {
        assetsDir: 'public',
        assetsInlineLimit: 0,
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: srcFilePaths()
        }
    },
    plugins: [
        htmlBuildPlugin()
    ]
})