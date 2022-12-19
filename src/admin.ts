import { S3 } from '@aws-sdk/client-s3'
import { encrypt, decrypt } from 'crypto-js/aes'
import { enc } from 'crypto-js'
import { log } from 'console'

const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)

$<HTMLDivElement>('#app')
const _formSection = $<HTMLElement>('.data-form')

const button = $<HTMLButtonElement>('main button')
const output = $<HTMLParagraphElement>('main p')
const usernameInput = $<HTMLInputElement>('#username')
const passwordInput = $<HTMLInputElement>('#password')

const bucketOutline = $<HTMLElement>('#bucket-outline')
const currentFile = $<HTMLElement>('#current-file')

button?.addEventListener("click", async () => {
    const bucket = 'Shayuks-Ijazaats'
    //TODO: MAKE NEW KEYS THESE ARE COMPROMISED
    // PUT IN ENCRYPTED FORMAT TO BE DECRYPTED WITH A PASSWORD

    // const username = 'admin'
    // const password = 'bismillah'
    const username = usernameInput?.value
    const password = passwordInput?.value

    const key = `${username}:${password}`
    const decrypted = decrypt('U2FsdGVkX1/PKEsALcvgweQSkT+OofMDKrb8FMN9bUHDhDHHTFtb38U7na+Gs3l6uzDN8I9eFzIjEjGQmecgFVPtoABJGBl0ddCLP22pHKg=', key)
    console.log(decrypted)
    const secret = decrypted.toString(enc.Utf8).split(':')
    const appKeyID = secret[0]
    const appKey = secret[1]
    console.log(appKeyID);
    console.log(appKey);

    const region = 'us-west-004'

    const endpoint = `https://s3.${region}.backblazeb2.com`

    let s3 = new S3({
        endpoint: endpoint,
        region: region,
        credentials: {
            accessKeyId: appKeyID,
            secretAccessKey: appKey,
        }
    })
    const bucketOutline = $<HTMLElement>('#bucket-outline')
    const currentFile = $<HTMLElement>('#current-file')

    try {
        const data = await s3.listObjectsV2({ Bucket: bucket })
        console.log(data)
        output!.innerText = `${JSON.stringify(data.Contents)}`

        const files = data.Contents
        const fileList = $<HTMLUListElement>('#bucket-outline #files')

        if (files == undefined) { return }
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const li = document.createElement('li')
            const button = document.createElement('button')
            file.Key ? button.innerText = file.Key : 0
            button.addEventListener('click', async (ev) => {
                const data2 = await s3.getObject({ Bucket: bucket, Key: file.Key })
                const objectContent = await data2.Body?.transformToString()
                console.log(objectContent)

                bucketOutline!.hidden = true

                currentFile!.hidden = false

                const dataP = document.createElement('p')
                dataP.innerText = `${objectContent}`

                currentFile?.appendChild(dataP)
            })
            li.appendChild(button)
            fileList ? fileList.appendChild(li) : 0
        }
    }
    catch {
        output!.innerText = 'Username or Password are wrong'
    }

})

const outlineHomeButton = $<HTMLButtonElement>('#outline-home-button')
outlineHomeButton!.addEventListener('click', () => {
    bucketOutline!.hidden = false
    currentFile!.innerHTML = ''
    currentFile!.hidden = true
})

export { }



// Thoughts on admin
/*
User workflow
    User Login
    Sees Files they have access to.
    If click file it brings up file form for editing
    Or Create new file
        if already existing one then bring its editable form
        Once created and submit will create new file at that directory
        Form:
            String 
            files 
            images
    No deleting possible at the moment
    Update site button to update site after making changes
        - Triggers new build on github
        - Else github will be built daily.

Forntend will get json data from bucket and create pages and object 
based on that for future use



Implementation
User login 
    - decrypt api key using username + password login X
System
    - See directory structure of files you have access to X
    - Can search through to find right file if existing - - -
    - Can create new one if not already made
    - Can edit existing files you have access to
User
    - Fills form or edits form
    - Saves data to bucket by sumbitting form
System
    - Back to main page
User
    - Rebuilds Website by clicking button
    - DOne in usually 10 mins or less

*/