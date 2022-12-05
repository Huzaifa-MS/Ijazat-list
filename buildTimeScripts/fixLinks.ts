export const fixLinks = ($: cheerio.Root, selector: string, attr: string, prefix: string) => {
    const attrs: string[] = []
    $(selector).each((_index, element) => {
        let elementAttr = $(element).attr(attr)
        console.log($(element).attr());

        attrs.push(`/${prefix}${elementAttr}`)
    })

    $(selector).each((_index, element) => {
        $(element).attr(attr, attrs[_index])
    })

    return $
}