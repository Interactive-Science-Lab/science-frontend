export const stringifyDateTime = (d) => {
    if(typeof d === 'string') { d = new Date(d) }

    const date = d,
    v = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getDay(),
        date.getTimezoneOffset()
    ];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const hours = v[3] > 12 ? v[3] - 12 : v[3]
    const mm = v[3] > 12 ? "pm" : "am"
    const minutes = v[4] < 10 ? `0${v[4]}` : v[4]
    return `${days[v[5]]} ${v[1]}/${v[2]} @ ${hours}:${minutes} ${mm}`
}

export const stringifyDate = (d) => {
    if(typeof d === 'string') { d = new Date(d) }

    const date = d,
    v = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate()
    ];
    return `${v[1]}/${v[2]}/${v[0]}`
}