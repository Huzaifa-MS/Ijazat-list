const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)

$<HTMLDivElement>('#app')

export { }
