export function idToString(id: number): string {
    const res = id.toString().split('');
    const length = res.length
    for (let i = 0; i < (4 - length); i++) {
        res.unshift('0');
    }
    return res.join('');
}

export function idToNumber(id: string): number {
    return parseInt(id, 10);
}