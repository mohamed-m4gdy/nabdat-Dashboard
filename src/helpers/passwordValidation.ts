export const strongPassword = (value: string) => {
    if(value != '' && value != null) {
        const format1 = /.*[@$!%*#?&].*/
        const format2 = /.*[a-z].*/
        const format3 = /.*[A-Z].*/
        return format1.test(value) && format2.test(value) && format3.test(value)
    } else {
        return true
    }
}
