import { globbySync } from "globby"
import path from "path"
import { fileURLToPath } from 'url';

import * as cheerio from 'cheerio'
import { readFileSync, writeFileSync } from "fs";
import fse from 'fs-extra'

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

    const y: string[] = []
    $('img').each((_index, element) => {
        console.log("---------------");

        console.log($(element).attr('src'));

        let src = $(element).attr('src')

        y.push(`/Ijazat-list/public${src}`)
    })
    $('img').each((_index, element) => {
        $(element).attr('src', y[_index])
    })

    console.log($('img').html());



    const newHtml = $.html()
    writeFileSync(fullFilePath, newHtml)

    console.log(root);


    const src = `${root}/public`
    const dest = `${root}/dist/public`
    try {
        fse.copySync(src, dest, { overwrite: true })
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}
