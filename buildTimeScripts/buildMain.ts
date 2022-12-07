import path from 'path'
import { globbySync } from 'globby'
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';

import fse from 'fs-extra'
import * as cheerio from 'cheerio'
import { PluginOption } from 'vite';

import { templateMapping } from './template.json.js';
// import { prefixAttr } from './domManipulation.js';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..')

export const traverseDistFiles = () => {
    const distFilePaths = globbySync('dist/**/*.html', { cwd: root })
    for (let index = 0; index < distFilePaths.length; index++) {

        const filePath = distFilePaths[index]
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
}

export const htmlBuildPlugin = (): PluginOption => {
    return {
        name: 'html-transform',
        enforce: 'post',
        transformIndexHtml(html, _ctx) {
            let _html = html

            //replace template and components in html src
            for (var key in templateMapping) {

                // keyof typeof to force compiler to treat key as constrained to keys of templateMapping 
                const regEx = new RegExp(key, 'g')
                const val = templateMapping[key as keyof typeof templateMapping]

                _html = _html.replace(regEx, val!)
            }

            // replaces all page links with proper ones for dev and production
            _html = _html.replace(
                /<a href="\/src\//g,
                `<a href="/Ijazat-list/`
            )

            return _html
        }
    }
}

export const srcFilePaths = () => {
    const srcInputFilePaths = globbySync('src/**/*.html', { cwd: root })
    const srcFilePaths: any = {}
    for (let index = 0; index < srcInputFilePaths.length; index++) {
        const filePath = srcInputFilePaths[index]
        const name = path.basename(filePath)
        if (srcFilePaths[name]) {
            srcFilePaths[filePath] = filePath
        }
        else {
            srcFilePaths[name] = filePath
        }
    }
    return srcFilePaths
}
