import { readFileSync } from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

import shayuks from './data/shayuk.json' assert { type: "json" }
import schools from './data/schools.json' assert { type: "json" }


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

// Right now: Inject components & data -> send to templateMapping X
// Make Data for Templates
// Wire up for each page
// Fetch data from bucket

// Could gulp files -> Inject any components or data -> send to templateMapping

const navbarComponent = getFileContents(resolve(__dirname, './templates/navbar.component.html'))
const shaykTemplate = getFileContents(resolve(__dirname, './templates/shayk.component.html'))
const schoolTemplate = getFileContents(resolve(__dirname, './templates/school.component.html'))
// Getting list of shayks to display

const getAllShayuk = () => {
    let shayksHtml = '<section class="shayuk-list">\n'
    for (const shayk in shayuks) {
        const attrs: any = shayuks[shayk as keyof typeof shayuks]
        const shaykHtml = injectDataInTemplate(shaykTemplate, attrs)

        shayksHtml += shaykHtml
        shayksHtml += '\n'
    }
    shayksHtml += '</section>\n'
    return shayksHtml
}

const getAllSchools = () => {
    let schoolsHtml = '<section class="shayuk-list">\n'
    for (const school in schools) {
        const attrs: any = schools[school as keyof typeof schools]
        const schoolHtml = injectDataInTemplate(schoolTemplate, attrs)

        schoolsHtml += schoolHtml
        schoolsHtml += '\n'
    }
    schoolsHtml += '</section>\n'
    return schoolsHtml
}

//It is possible to move this to a file
//Watch that file 
//Run some script to update html.json snippet on file change
export const templateMapping = {
    '<!-- navbar -->': navbarComponent,
    '<!-- allShayuk -->': getAllShayuk(),
    '<!-- allSchools -->': getAllSchools(),
}