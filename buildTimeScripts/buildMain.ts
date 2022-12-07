import { globbySync } from 'globby'
import path from 'path'
import { fileURLToPath } from 'url';

import * as cheerio from 'cheerio'
import { readFileSync, writeFileSync } from 'fs';
import fse from 'fs-extra'
import { PluginOption } from 'vite';
// import { prefixAttr } from './domManipulation.js';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..')

const inputFilePaths = globbySync('dist/**/*.html', { cwd: root })

for (let index = 0; index < inputFilePaths.length; index++) {

    const filePath = inputFilePaths[index]
    const fullFilePath = path.resolve(root, filePath)
    const html = readFileSync(fullFilePath)
    const $ = cheerio.load(html)

    // prefixAttr($, 'nav ul ul li a', 'href', 'Ijazat-list')
    // prefixAttr($, 'img', 'src', 'Ijazat-list/public')

    const newHtml = $.html()
    writeFileSync(fullFilePath, newHtml)

    const src = `${root}/public`
    const dest = `${root}/dist/public`
    try {
        fse.copySync(src, dest, { overwrite: true })
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

const htmlPlugin = (): PluginOption => {
    return {
        name: 'html-transform',
        enforce: 'pre',
        transformIndexHtml(html, ctx) {

            // replaces all page links with proper ones for dev
            // g at end of regex to replace all
            let _html = html.replace(
                /<a href="\//g,
                `<a href="/Ijazat-list/`
            )
            return _html
        }
    }
}
