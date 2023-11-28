export function stringToInputDate (date: string) {
    if (date) {
    return new Date(date).toISOString().split('T')[0]
    }
    return new Date().toISOString().split('T')[0]
   }