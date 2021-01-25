export function transformDate(dateString): Date {
    dateString = dateString.replace(/\//g, '')

    return eval("new " + dateString)
}