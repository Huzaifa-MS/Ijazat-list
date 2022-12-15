import * as aws from '@aws-sdk/client-s3'

const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)

$<HTMLDivElement>('#app')
const _formSection = $<HTMLElement>('.data-form')

// var requestOptions: RequestInit = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: {
//         'Access-Control-Allow-Origin': '*'
//     }

// }

const button = $<HTMLButtonElement>('main button')
const output = $<HTMLParagraphElement>('main p')
button?.addEventListener("click", () => {
    const bucket = 'Shayuks-Ijazaats'
    const appKeyID = '004fe30f115852f0000000002'
    const appKey = 'K004i0dg1sn79vBCWjWLsCxNQf/T6fo'
    const region = 'us-west-004'

    const endpoint = `https://s3.${region}.backblazeb2.com`

    let s3 = new aws.S3({
        endpoint: endpoint,
        region: region,
        credentials: {
            accessKeyId: appKeyID,
            secretAccessKey: appKey,
        }
    })

    s3.listObjects({ Bucket: bucket }, (err, data) => {
        if (err) console.error(err, err.stack);
        else console.log(data);


    })
})



export { }
