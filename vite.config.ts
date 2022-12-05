import { build, defineConfig } from 'vite'
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

console.log(inputFiles);


export default defineConfig({
    root: "src",
    base: "/Ijazat-list/",
    build: {
        assetsInlineLimit: 0,
        emptyOutDir: true,
        rollupOptions: {
            input: inputFiles
        }
    }
})