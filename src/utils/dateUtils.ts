export function timestamptzToDate(timestamptz: string): Date {
    const dateNum = Date.parse(timestamptz)
    return new Date(dateNum)
}

/*
takes a 0 indexed input for a month, and returns its 3-letter abbreviation
i.e. 0 -> Jan, 4 -> May
*/
export function monthNumToStr(monthNum: number): string {
    const map: Map<number, string> = new Map<number, string>()
    map.set(0, "Jan")
    map.set(1, "Feb")
    map.set(2, "Mar")
    map.set(3, "Apr")
    map.set(4, "May")
    map.set(5, "Jun")
    map.set(6, "Jul")
    map.set(7, "Aug")
    map.set(8, "Sep")
    map.set(9, "Oct")
    map.set(10, "Nov")
    map.set(11, "Dec")

    return map.get(monthNum) ?? ""
}


/*
Turns a date object into a formatted string
*/
export function dateToStr(date: Date): string {
    return `${monthNumToStr(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
}