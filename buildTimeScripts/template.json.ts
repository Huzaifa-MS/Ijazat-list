// import { readFileSync, writeFileSync } from 'fs';
// const navbar = readFileSync()

export const templateMapping = {
    '<!-- custom-navbar -->': `
        <nav>
            <ul>
                <li>*Logo Here*</li>
                <ul>
                    <li><a href="/src/index.html">Home</a></li>
                    <li><a href="/src/schools/index.html">Schools</a></li>
                    <li><a href="/src/books/index.html">Books</a></li>
                    <li><a href="/src/shayuk/index.html">Shayks & Students of Knowledge</a></li>
                </ul>
                <li id="search-bar">
                <input placeholder="Search">
                </li>
            </ul>
        </nav>
    `
}