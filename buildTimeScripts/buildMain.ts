import { globbySync } from 'globby'
import path from 'path'
import { fileURLToPath } from 'url';

import * as cheerio from 'cheerio'
import { readFileSync, writeFileSync } from 'fs';
import fse from 'fs-extra'
import { fixLinks } from './fixLinks.js';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..')

const inputFilePaths = globbySync('dist/**/*.html', { cwd: root })

for (let index = 0; index < inputFilePaths.length; index++) {

    const filePath = inputFilePaths[index]
    const fullFilePath = path.resolve(root, filePath)
    const html = readFileSync(fullFilePath)
    const $ = cheerio.load(html)

    fixLinks($, 'nav ul ul li a', 'href', 'Ijazat-list')
    fixLinks($, 'img', 'src', 'Ijazat-list/public')

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
