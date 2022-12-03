import { } from "fs"

let x = fetch('https://www.google.com')
const y = (await x).url

console.log(y);

