export function createTime(hours: number, minutes: number): Date {
    const dateHours = new Date(0).setHours(hours)
    const dateMinutes = new Date(dateHours).setMinutes(minutes)
    return new Date(dateMinutes)
}
