import { readFileSync } from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

import shayuks from './shayuk.json' assert { type: "json" }


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename))

const getFileContents = (filePath: string,) => {
    const fileIO = readFileSync(filePath)
    const fileContent = fileIO.toString('utf-8')
    return fileContent
}
const injectDataInTemplate = (template: string, data: any) => {
    let _template = template
    for (const attribute in data) {
        const regEx = new RegExp(`<!-- ${attribute} -->`, 'g')

        _template = _template.replace(regEx, data[attribute])
    }
    return _template
}

// type Shayk = {
//     picture: string,
//     name: string,
//     bio: string,
//     university: string,
//     teacher: string,
//     books: string[],
//     Ijazaat: string[]
// }

// const shaykUthman: Shayk = {
//     picture: '/Ijazat-list/images/SheikUthmanIbnFarooq.webp',
//     name: 'Shayk Uthman Ibn Farooq',
//     bio: 'Bio',
//     university: 'Islamic University',
//     teacher: 'Teacher1',
//     books: ['book1', 'book2'],
//     Ijazaat: ['Ijazaat1', 'Ijazaat2']
// }


// Right now: Inject components & data -> send to templateMapping X
// Make Data for Templates
// Wire up for each page
// Fetch data from bucket

// Could gulp files -> Inject any components or data -> send to templateMapping
const navbarComponent = getFileContents(resolve(__dirname, 'navbar.component.html'))
const shaykTemplate = getFileContents(resolve(__dirname, 'shayk.component.html'))
// Getting list of shayks to display

const getAllShayuk = () => {
    let shayksHtml = '<section class="shayuk-list">\n\r'
    for (const shayk in shayuks) {
        const attr: any = shayuks[shayk as keyof typeof shayuks]
        const shaykHtml = injectDataInTemplate(shaykTemplate, attr)
        console.log(shayk);

        shayksHtml += shaykHtml
        shayksHtml += '\n\r'
    }
    shayksHtml += '</section>\n\r'
    return shayksHtml
}



export const templateMapping = {
    '<!-- navbar -->': navbarComponent,
    // '<!-- shaykUthman -->': shaykUthmanTemplate,
    '<!-- allShayuk -->': getAllShayuk()
}