import { defineConfig, PluginOption } from 'vite'
import { globbySync } from 'globby'
import path from 'path'

const root = __dirname
const inputFilePaths = globbySync('src/**/*.html', { cwd: root })
const inputFiles = {}
for (let index = 0; index < inputFilePaths.length; index++) {
    const filePath = inputFilePaths[index]
    const name = path.basename(filePath)
    if (inputFiles[name]) {
        inputFiles[filePath] = filePath
    }
    else {
        inputFiles[name] = filePath
    }
}

const htmlPlugin = (): PluginOption => {
    return {
        name: 'html-transform',
        enforce: 'pre',
        transformIndexHtml(html, ctx) {

            // replaces all page links with proper ones for dev
            return html.replace(
                /<a href="\/src\//g,
                `<a href="/Ijazat-list/`
            )
        }
    }
}

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
            input: inputFiles
        }
    },
    plugins: [
        htmlPlugin()
    ]
})