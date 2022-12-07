export const prefixAttr = ($: cheerio.Root, selector: string, attr: string, prefix: string) => {
    const attrs: string[] = []
    $(selector).each((_index, element) => {
        let elementAttr = $(element).attr(attr)

        attrs.push(`/${prefix}${elementAttr}`)
    })

    $(selector).each((_index, element) => {
        $(element).attr(attr, attrs[_index])
    })

    return $
}