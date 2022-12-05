import { globbySync } from "globby"
import path from "path"
import { fileURLToPath } from 'url';

import * as cheerio from 'cheerio'
import { readFileSync, writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..')

const inputFilePaths = globbySync('dist/**/*.html', { cwd: root })

for (let index = 0; index < inputFilePaths.length; index++) {

    const filePath = inputFilePaths[index]
    const fullFilePath = path.resolve(root, filePath)

    console.log(index);
    console.log(fullFilePath);

    const html = readFileSync(fullFilePath)
    const $ = cheerio.load(html)

    const x: string[] = []
    $('nav ul ul li').each((_index, element) => {
        let href = $(element).html()?.split('"')![1]

        x.push(`/Ijazat-list${href}`)
    })
    $('nav ul ul li a').each((_index, element) => {
        $(element).attr('href', x[_index])
    })


    const newHtml = $.html()
    writeFileSync(fullFilePath, newHtml)

}



export { }